const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let doll=null,blinkTimer,openTimer,nodTimer;
function stop(){
 clearTimeout(blinkTimer);clearTimeout(openTimer);clearTimeout(nodTimer);
 doll?.classList.remove('is-blinking','is-reacting');
}
function schedule(){
 if(!doll?.isConnected||document.hidden||reduced.matches)return;
 blinkTimer=setTimeout(()=>{
  if(!doll?.isConnected)return;
  doll.classList.add('is-blinking');
  openTimer=setTimeout(()=>{doll?.classList.remove('is-blinking');schedule();},140);
 },2800+Math.random()*3200);
}
export function mountCharacter(next){stop();doll=next;schedule();}
export function reactMotion(){
 if(!doll||reduced.matches)return;
 clearTimeout(nodTimer);doll.classList.remove('is-reacting');
 // Restart a short nod without replacing the focused touch button.
 void doll.offsetWidth;doll.classList.add('is-reacting');
 nodTimer=setTimeout(()=>doll?.classList.remove('is-reacting'),750);
}
function resume(){stop();document.documentElement.classList.toggle('character-paused',document.hidden);schedule();}
document.addEventListener('visibilitychange',resume);
reduced.addEventListener('change',resume);
