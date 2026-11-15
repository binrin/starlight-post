export const WARDROBE=[
 {id:'outfit-postal',slot:'outfit',name:'별빛 우편복',price:0,desc:'우리의 첫 편지와 함께한 청록빛 옷',art:'outfit-postal'},
 {id:'outfit-sailor',slot:'outfit',name:'바닷바람 세일러',price:300,desc:'하늘빛 블라우스와 물결 자수의 주름치마',art:'outfit-sailor'},
 {id:'outfit-overalls',slot:'outfit',name:'데이지 작업복',price:260,desc:'꽃 자수 주머니와 활동하기 편한 멜빵바지',art:'outfit-overalls'},
 {id:'outfit-winter',slot:'outfit',name:'첫눈의 크랜베리',price:480,desc:'포근한 양털 칼라와 붉은 겨울 외투',art:'outfit-winter'},
 {id:'outfit-rose',slot:'outfit',name:'장미 정원의 오후',price:240,desc:'장미 자수와 크림 레이스의 원피스',art:'outfit-rose'},
 {id:'outfit-scholar',slot:'outfit',name:'한밤의 서고',price:280,desc:'은빛 별자리와 단정한 남색 조끼',art:'outfit-scholar'},
 {id:'outfit-forest',slot:'outfit',name:'초록길 여행자',price:320,desc:'잎사귀 자수와 작은 숲빛 케이프',art:'outfit-forest'},
 {id:'outfit-festival',slot:'outfit',name:'별이 내리는 축제',price:650,desc:'금빛 별 자수와 겹겹의 아이보리 레이스',art:'outfit-festival'},
 {id:'outfit-baker',slot:'outfit',name:'꿀빛 베이커리',price:220,desc:'밀 이삭 앞치마와 따뜻한 시나몬빛 옷',art:'outfit-baker'},
 {id:'shoes-white',slot:'shoes',name:'크림 리본 슈즈',price:0,desc:'가볍고 단정한 처음의 신발',art:'outfit-postal'},
 {id:'shoes-brown',slot:'shoes',name:'우편사의 가죽 부츠',price:150,desc:'황동 장식과 꼼꼼한 가죽 끈',art:'shoes-brown'},
 {id:'shoes-rose',slot:'shoes',name:'로즈 메리제인',price:180,desc:'작은 리본이 달린 장밋빛 구두',art:'shoes-rose'},
 {id:'shoes-navy',slot:'shoes',name:'밤하늘 로퍼',price:200,desc:'별 모양 버클의 남색 로퍼',art:'shoes-navy'},
 {id:'shoes-gold',slot:'shoes',name:'샴페인 발레 슈즈',price:300,desc:'진주 장식과 금빛 새틴 리본',art:'shoes-gold'},
 {id:'accessory-none',slot:'accessory',name:'장식 없이',price:0,desc:'자연스러운 나의 모습',art:null},
 {id:'accessory-star',slot:'accessory',name:'첫 별 머리핀',price:60,desc:'작은 별 하나를 머리맡에',art:'accessory-star'},
 {id:'accessory-ribbon',slot:'accessory',name:'장미 새틴 리본',price:100,desc:'부드럽게 접힌 로즈 리본',art:'accessory-ribbon'},
 {id:'accessory-flower',slot:'accessory',name:'달꽃 화관',price:180,desc:'하얀 꽃과 작은 잎을 엮은 화관',art:'accessory-flower'},
 {id:'accessory-beret',slot:'accessory',name:'별지기 베레모',price:220,desc:'금빛 브로치가 달린 청록 베레모',art:'accessory-beret'},
 {id:'accessory-glasses',slot:'accessory',name:'동그란 금테 안경',price:130,desc:'호기심 가득한 눈을 위한 작은 금테',art:'accessory-glasses'}
];
export const HAIRSTYLES=[{id:'bob',name:'자연스러운 단발',price:100,desc:'가볍고 단정한 기본 단발',art:'outfit-postal'}, {id:'wave',name:'꽃잎 웨이브',price:160,desc:'끝을 부드럽게 말아 올린 웨이브',art:'hair-wave'}, {id:'pony',name:'발랄한 포니테일',price:140,desc:'가볍게 묶어 올린 짧은 포니테일',art:'hair-pony'}, {id:'bun',name:'우아한 올림머리',price:180,desc:'섬세하게 땋아 올린 둥근 번',art:'hair-bun'}];
export const HAIRCOLORS=[{id:'chestnut',name:'밤빛 갈색',price:60,swatch:'#855139',filter:'none'},{id:'black',name:'흑진주',price:80,swatch:'#302d35',filter:'saturate(.25) brightness(.48)'},{id:'honey',name:'꿀빛 금발',price:100,swatch:'#d8ae65',filter:'sepia(.65) saturate(1.15) brightness(1.55)'},{id:'silver',name:'달빛 은발',price:120,swatch:'#c4beca',filter:'saturate(.06) brightness(1.6) contrast(.73)'},{id:'rose',name:'로즈 브라운',price:100,swatch:'#a86a80',filter:'hue-rotate(320deg) saturate(.7) brightness(1.14)'}];
export const DEFAULT_LOOK={outfit:'outfit-postal',shoes:'shoes-white',accessory:'accessory-none',hair:'bob',color:'chestnut'};
export function defaultCosmetics(){return {owned:['outfit-postal','shoes-white','accessory-none'],look:{...DEFAULT_LOOK},salonVisits:0};}
export function validateCosmetics(data){
 if(data===undefined)return defaultCosmetics();
 if(!data||!Array.isArray(data.owned)||data.owned.length>WARDROBE.length||data.owned.some(id=>!WARDROBE.some(i=>i.id===id)))throw Error('옷장 저장 정보가 올바르지 않아요.');
 if(!data.look||typeof data.look!=='object')throw Error('착용 정보가 올바르지 않아요.');
 const result=defaultCosmetics();result.owned=[...new Set([...result.owned,...data.owned])];
 for(const slot of ['outfit','shoes','accessory']){const id=data.look[slot];if(!result.owned.includes(id)||!WARDROBE.some(i=>i.id===id&&i.slot===slot))throw Error('가지고 있지 않은 아이템이 착용되어 있어요.');result.look[slot]=id;}
 if(!HAIRSTYLES.some(i=>i.id===data.look.hair)||!HAIRCOLORS.some(i=>i.id===data.look.color))throw Error('헤어샵 저장 정보가 올바르지 않아요.');
 if(!Number.isSafeInteger(data.salonVisits)||data.salonVisits<0||data.salonVisits>999999)throw Error('헤어샵 방문 기록이 올바르지 않아요.');
 result.look.hair=data.look.hair;result.look.color=data.look.color;result.salonVisits=data.salonVisits;return result;
}
function note(s,text){s.history.unshift({month:s.month,text});s.history=s.history.slice(0,80);return s;}
export function buyWear(state,id){const item=WARDROBE.find(i=>i.id===id);if(!item||state.ended)throw Error('지금 구매할 수 없어요.');if(state.cosmetics.owned.includes(id))throw Error('이미 가지고 있어요. 무료로 갈아입어 주세요.');if(state.coins<item.price)throw Error('소지금이 부족해요. 일을 해서 조금 더 모아 주세요.');const s=structuredClone(state);s.coins-=item.price;s.cosmetics.owned.push(id);s.cosmetics.look[item.slot]=id;return note(s,`${item.name} 구매 · ${item.price}G`);}
export function equip(state,id){const item=WARDROBE.find(i=>i.id===id);if(!item||state.ended||!state.cosmetics.owned.includes(id))throw Error('먼저 구매한 아이템만 착용할 수 있어요.');const s=structuredClone(state);s.cosmetics.look[item.slot]=id;return s;}
export function salonQuote(state,hair,color){const style=HAIRSTYLES.find(i=>i.id===hair),dye=HAIRCOLORS.find(i=>i.id===color);if(!style||!dye)throw Error('선택할 수 없는 스타일이에요.');return (state.cosmetics.look.hair===hair?0:style.price)+(state.cosmetics.look.color===color?0:dye.price);}
export function visitSalon(state,hair,color){if(state.ended)throw Error('계속 육성으로 돌아간 후 방문해 주세요.');const price=salonQuote(state,hair,color);if(!price)throw Error('이미 같은 헤어스타일과 색상이에요.');if(state.coins<price)throw Error('헤어샵 이용 금액이 부족해요.');const s=structuredClone(state);s.coins-=price;s.cosmetics.look.hair=hair;s.cosmetics.look.color=color;s.cosmetics.salonVisits++;return note(s,`헤어샵 · ${HAIRSTYLES.find(i=>i.id===hair).name}, ${HAIRCOLORS.find(i=>i.id===color).name} · ${price}G`);}
