const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let doll=null,blinkTimer,openTimer,nodTimer,generation=0;
const waveImages=new Map();
function warmWave(el){const id=el?.dataset.wave;if(!id)return Promise.resolve();if(!waveImages.has(id)){const image=new Image();image.src=`./assets/anime/${id}.webp`;waveImages.set(id,image.decode().catch(()=>{waveImages.delete(id);return false;}));}return waveImages.get(id);}
function stop(){generation++;
 clearTimeout(blinkTimer);clearTimeout(openTimer);clearTimeout(nodTimer);
 doll?.classList.remove('is-blinking','is-reacting','is-pet','is-wave','is-talk');
}
function schedule(){
 if(!doll?.isConnected||document.hidden||reduced.matches)return;
 blinkTimer=setTimeout(()=>{
  if(!doll?.isConnected)return;
  if(!doll.classList.contains('is-pet'))doll.classList.add('is-blinking');
  openTimer=setTimeout(()=>{doll?.classList.remove('is-blinking');schedule();},140);
 },2800+Math.random()*3200);
}
export function mountCharacter(next){stop();doll=next;warmWave(next);schedule();}
export async function reactMotion(kind='talk'){
 const target=doll,token=++generation;if(!target)return;
 if(kind==='wave'&&await warmWave(target)===false)return;
 if(doll!==target||token!==generation||!target.isConnected)return;
 clearTimeout(nodTimer);target.classList.remove('is-reacting','is-pet','is-wave','is-talk','is-blinking');
 void target.offsetWidth;target.classList.add('is-'+kind);
 if(!reduced.matches)target.classList.add('is-reacting');
 nodTimer=setTimeout(()=>target.classList.remove('is-reacting','is-pet','is-wave','is-talk'),2400);
}
function resume(){stop();document.documentElement.classList.toggle('character-paused',document.hidden);schedule();}
document.addEventListener('visibilitychange',resume);
reduced.addEventListener('change',resume);
