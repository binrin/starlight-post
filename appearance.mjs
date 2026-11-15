import {WARDROBE,HAIRSTYLES,HAIRCOLORS,DEFAULT_LOOK} from './cosmetics.mjs';
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function portrait(look=DEFAULT_LOOK,stage=0,extra='',emotion='neutral'){
 const costume=WARDROBE.find(i=>i.id===look.outfit)||WARDROBE[0],shoe=WARDROBE.find(i=>i.id===look.shoes),hair=HAIRSTYLES.find(i=>i.id===look.hair)||HAIRSTYLES[0],color=HAIRCOLORS.find(i=>i.id===look.color)||HAIRCOLORS[0],acc=WARDROBE.find(i=>i.id===look.accessory);
 const feeling=['happy','tired','sad'].includes(emotion)?emotion:'neutral';
 const s=Math.max(0,Math.min(2,stage)),neck=[33.6,24.2,19.4][s];
 const faceStyle=`--face-x:${[53.2,50.7,49.8][s]}%;--face-y:${[27.5,18.3,12.8][s]}%;--eyes-top:${[24.8,15.5,10.1][s]}%;--eyes-bottom:${[28.8,19.6,14.2][s]}%;mask-image:linear-gradient(#000,#000),url('./assets/anime/mask-${hair.id}.webp');`;
 const live=extra.split(' ').includes('scene-doll');
 const wrists={
 'outfit-postal':[[69.5,38.4],[69.8,30.6],[71.6,25.3]],'outfit-rose':[[67.8,38.7],[68,30.4],[68.8,25.3]],
 'outfit-sailor':[[67,37.6],[67,29.3],[67.5,24.5]],'outfit-overalls':[[69.5,36.9],[70,28.3],[71.8,23.5]],
 'outfit-winter':[[70,38.4],[70,30.3],[71,25.2]]};
 const [wristX,wristY]=(wrists[costume.id]||wrists['outfit-postal'])[s];
 const zone=(part,label,left,top,width,height)=>`<button class="character-touch touch-${part}" data-action="touch-character" data-part="${part}" aria-label="${label}" style="left:${left}%;top:${top}%;width:${width}%;height:${height}%"></button>`;
 const layer=(asset,cls,style='')=>`<span class="doll-layer ${cls}" style="background-image:url('./assets/anime/${asset}.webp');${style}"></span>`;
 return `<div class="paperdoll age-${s} ${extra}" role="${live?'group':'img'}" data-emotion="${feeling}" aria-label="${safe(costume.name)}, ${safe(shoe?.name)}, ${safe(hair.name)}, ${safe(color.name)}, ${safe(acc?.name)}" data-wave="wave-${costume.art}" data-look="${safe(JSON.stringify(look))}" style="--wrist-x:${wristX}%;--wrist-y:${wristY}%;--hand-cut:${wristX-4.8}%;--hand-top:${[29,19.5,13.5][s]}%;--frame:${s*50}%;--neck:${neck}%;--head-y:${[23.8,14.8,9.1][s]}%"><span class="doll-gesture"><span class="doll-motion">${layer(costume.art,'doll-body')}${live?layer('wave-'+costume.art,'doll-wave-body')+layer('wave-'+costume.art,'doll-wave-hand'):''}${layer(shoe?.art||'outfit-postal','doll-shoes')}<span class="doll-facegroup">${layer(hair.art,'doll-head')}${color.id!=='chestnut'?layer(hair.art,'doll-dye',`filter:${color.filter};mask-image:url('./assets/anime/mask-${hair.id}.webp');-webkit-mask-image:url('./assets/anime/mask-${hair.id}.webp');`):''}${layer(feeling==='neutral'?'outfit-postal':feeling==='happy'?'emotion-bright':'emotion-'+feeling,'doll-emotion',faceStyle)}${live?layer('emotion-blink','doll-blink',faceStyle):''}${acc?.art?`<img class="doll-accessory acc-${acc.id.replace('accessory-','')}" src="./assets/anime/${acc.art}.webp" alt="" aria-hidden="true">`:''}</span></span></span>${live?zone('body','캐릭터와 이야기하기',39,neck,25,38)+zone('head','머리 쓰다듬기',[38,35,34][s],[17,7,1][s],32,17)+zone('hand-left','왼쪽 손에 인사하기',[22,19,18][s],[53,48,45][s],19,12)+zone('hand-right','오른쪽 손에 인사하기',69,[53,48,45][s],19,12)+`<span class="pet-spark" aria-hidden="true" style="top:${[18,8,2][s]}%">♥</span>`:''}</div>`;
}
