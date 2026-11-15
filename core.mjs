import {defaultCosmetics,validateCosmetics} from './cosmetics.mjs';
export const VERSION='2.3.0';
export const STATS={wisdom:'지혜',vigor:'체력',heart:'마음',craft:'솜씨',charm:'표현',brave:'용기'};
export const PEOPLE={sol:{name:'솔',role:'고장 난 별시계를 고치는 발명가',line:'답이 없으면, 새로운 질문을 만들면 되지.',stat:'wisdom'},yun:{name:'윤',role:'숲길을 기록하는 길잡이',line:'천천히 걸어도 길은 우리를 기다려.',stat:'brave'},dam:{name:'담',role:'마을의 이야기를 굽는 제빵사',line:'따뜻한 빵 한 조각이 편지보다 빠를 때도 있어.',stat:'heart'}};
export const ACTIONS=[
 {id:'letters',name:'서고 수업',group:'배움',icon:'book',cost:45,stress:9,gain:{wisdom:15,heart:3},desc:'오래된 편지를 읽고 세상을 배워요.'},
 {id:'exercise',name:'숲길 훈련',group:'배움',icon:'leaf',cost:35,stress:8,gain:{vigor:15,brave:4},desc:'호흡을 고르고 튼튼한 몸을 길러요.'},
 {id:'workshop',name:'별시계 공방',group:'배움',icon:'star',cost:50,stress:11,gain:{craft:15,wisdom:4},friend:'sol',desc:'작은 톱니를 맞춰 멈춘 시간을 움직여요.'},
 {id:'music',name:'광장 연주',group:'배움',icon:'music',cost:40,stress:7,gain:{charm:15,heart:4},desc:'서툰 마음을 음악으로 전해요.'},
 {id:'herbs',name:'약초 공부',group:'배움',icon:'leaf',cost:40,stress:7,gain:{heart:12,wisdom:7},desc:'숲이 건네는 작은 치료법을 배워요.'},
 {id:'debate',name:'마을 토론회',group:'배움',icon:'chat',cost:45,stress:9,gain:{brave:12,charm:7},desc:'자기 생각을 말하고 다른 의견을 들어요.'},
 {id:'mail',name:'편지 배달',group:'일',icon:'mail',pay:65,stress:12,gain:{vigor:5,heart:5},desc:'언덕 너머까지 마음을 배달해요.'},
 {id:'bakery',name:'빵집 도우미',group:'일',icon:'sun',pay:60,stress:10,gain:{craft:6,heart:4},friend:'dam',desc:'갓 구운 빵과 함께 아침을 열어요.'},
 {id:'repair',name:'수리점 도우미',group:'일',icon:'gear',pay:80,stress:15,gain:{craft:7,wisdom:3},require:{craft:60},friend:'sol',desc:'솜씨 60부터. 고장 난 물건에 새 시간을 줘요.'},
 {id:'guide',name:'숲길 안내',group:'일',icon:'compass',pay:90,stress:16,gain:{brave:7,vigor:4},require:{brave:70},friend:'yun',desc:'용기 70부터. 여행자들의 길잡이가 돼요.'},
 {id:'perform',name:'거리 공연',group:'일',icon:'music',pay:90,stress:13,gain:{charm:8,heart:3},require:{charm:70},desc:'표현 70부터. 광장에 작은 무대를 열어요.'},
 {id:'forest',name:'속삭임 숲',group:'탐험',icon:'leaf',cost:20,stress:13,gain:{brave:9,vigor:7},explore:'forest',friend:'yun',desc:'잊힌 숲 우편함을 찾아요. 용기 50이면 성공률이 올라요.'},
 {id:'ruins',name:'별시계 유적',group:'탐험',icon:'star',cost:30,stress:17,gain:{wisdom:9,craft:7},require:{forest:3,wisdom:80},explore:'ruins',desc:'오래된 기계를 조사해요. 지혜 80이면 유리해요.'},
 {id:'coast',name:'유리빛 해안',group:'탐험',icon:'compass',cost:25,stress:15,gain:{vigor:8,charm:7},require:{forest:6,vigor:100},explore:'coast',desc:'해류에 실린 편지를 찾아요. 체력 60이면 유리해요.'},
 {id:'rest',name:'느긋한 휴식',group:'쉼',icon:'moon',stress:-32,health:16,gain:{heart:3},desc:'창문을 열고 쉬어요. 스트레스 −32, 건강 +16.'},
 {id:'picnic',name:'함께 소풍',group:'쉼',icon:'sun',cost:25,stress:-24,health:10,gain:{heart:8,charm:3},bond:6,desc:'우리만의 도시락을 나눠요. 유대 +6.'},
 {id:'volunteer',name:'마을 봉사',group:'쉼',icon:'heart',stress:-9,health:4,gain:{heart:10,brave:2},town:2,desc:'서로의 짐을 나눠요. 마을 신뢰 +2.'}
];
export const ITEMS=[{id:'tea',name:'달꽃 차',price:45,desc:'스트레스 −24',effect:{stress:-24}},{id:'soup',name:'따뜻한 수프',price:55,desc:'건강 +30',effect:{health:30}},{id:'notebook',name:'관찰 수첩',price:180,desc:'배움의 능력 상승량 +2 · 영구',permanent:true},{id:'boots',name:'여행자의 장화',price:160,desc:'탐험 성공률 +15% · 영구',permanent:true},{id:'ribbon',name:'우체국 리본',price:140,desc:'일 보수 +15% · 영구',permanent:true}];
const choice=(text,effect,reply)=>({text,effect,reply});
export const CHAPTERS=[
 ['비에 젖은 편지','폭풍이 지나간 날, 폐쇄된 우체국 앞에 아이와 배달되지 못한 편지 한 상자가 남았습니다. 당신은 아이와 함께 우체국의 불을 다시 켜기로 합니다.',choice('함께 답장을 써 보자',{bond:8,heart:10},'처음으로 우리 이름이 나란히 적혔다.'),choice('편지의 주인을 찾아보자',{brave:10,town:3},'문밖으로 이어진 발자국이 첫 배달길이 되었다.')],
 ['주소 없는 봉투','발신인도 수신인도 없는 편지에는 “별시계가 멈춘 날을 기억해 주세요”라는 한 줄만 남아 있습니다.',choice('솔에게 해독을 부탁하자',{wisdom:12,sol:8,order:1},'솔은 종이에 찍힌 톱니 모양을 알아보았다.'),choice('마을 어른들의 기억을 듣자',{heart:12,town:5,community:1},'서로 다른 기억들이 하나의 밤을 가리켰다.')],
 ['빵 한 조각의 답장','담의 빵집에는 늘 같은 사람이 값을 치르지 못한 채 머뭅니다. 담은 빈 접시 옆에 편지지를 놓아두었습니다.',choice('그 사람의 이야기를 적자',{heart:14,dam:10,community:1},'한 끼 식사가 길고 긴 답장이 되었다.'),choice('누구나 일할 수 있는 장터를 열자',{craft:12,town:6,order:1},'작은 장터에 첫 손님이 찾아왔다.')],
 ['숲길의 표시','윤이 오래된 우편 표식을 발견했습니다. 지도에는 그 길이 절벽에서 끝난다고 적혀 있습니다.',choice('새 지도를 함께 그리자',{brave:14,yun:10,freedom:1},'지도 끝에 빈칸 하나가 더 생겼다. 이번에는 가능성의 빈칸이었다.'),choice('안전한 우회로를 만들자',{vigor:12,town:6,community:1},'멀지만 누구도 혼자 남지 않는 길을 골랐다.')],
 ['유리병 속 파도','해변에 밀려온 편지는 떠난 선원의 사과였습니다. 수신인은 이미 다른 마을로 이사했습니다.',choice('바다 건너까지 전달하자',{brave:16,freedom:1,coins:-30},'답장을 기다리는 마음에는 국경이 없었다.'),choice('현재 주소를 차근차근 찾자',{wisdom:16,order:1},'낡은 명부 한 장에서 새로운 시작을 찾았다.')],
 ['별시계의 심장','솔이 발견한 설계도에는 별시계가 시간을 재는 기계가 아니라, 마을 사이의 신호를 잇던 장치라고 적혀 있습니다.',choice('누구나 읽을 수 있게 공개하자',{heart:14,sol:8,community:1},'설계도 아래 아이들의 질문이 빼곡히 붙었다.'),choice('복원 방법을 연구하자',{craft:18,sol:10,order:1},'녹슨 톱니 하나가 다시 맞물렸다.')],
 ['받지 못한 말','오래된 편지를 받은 주민이 봉투를 돌려줍니다. “지금은 읽을 준비가 안 됐어요.”',choice('준비될 때까지 보관하자',{heart:18,bond:5,community:1},'기다리는 것도 배달의 한 부분이라는 걸 배웠다.'),choice('보낸 사람에게 마음을 전하자',{charm:14,freedom:1},'답장이 없어도 전해질 수 있는 마음이 있었다.')],
 ['첫 번째 불빛','시범 가동을 앞두고 우체국 지붕에 작은 신호등이 달립니다. 누구에게 첫 불빛을 보낼까요?',choice('멀리 떨어진 마을에',{brave:16,freedom:1,town:4},'언덕 너머에서 느리지만 분명한 답신이 왔다.'),choice('밤길을 걷는 이웃에게',{heart:16,community:1,town:6},'집으로 돌아오는 발걸음마다 빛이 내려앉았다.')],
 ['시의회의 제안','시의회가 복원 비용을 지원하는 대신 모든 편지를 검사하겠다고 제안했습니다.',choice('사생활을 지키는 협약을 요구하자',{wisdom:18,order:1,town:6},'긴 협상 끝에 봉투를 열지 않는 원칙을 세웠다.'),choice('마을의 힘으로 천천히 고치자',{heart:18,community:1,town:6},'주머니마다 작은 동전이 모였다.')],
 ['폭풍 전의 약속','큰 폭풍이 다가옵니다. 남은 배달은 많고, 대피소에는 도움이 필요합니다.',choice('대피소를 먼저 돕자',{vigor:18,community:1,dam:10},'그날 배달된 것은 편지보다 많은 안도였다.'),choice('긴급 편지를 선별해 달리자',{brave:18,freedom:1,yun:10},'서둘러야 할 마음과 기다려도 될 마음을 배웠다.')],
 ['끊어진 다리','폭풍이 다리를 끊었습니다. 솔은 임시 통신 장치를, 윤은 산길을 제안합니다.',choice('통신 장치를 완성하자',{craft:20,order:1,sol:12},'두 마을 사이에 눈에 보이지 않는 다리가 놓였다.'),choice('새로운 산길을 개척하자',{brave:20,freedom:1,yun:12},'가장 먼저 건넨 것은 “괜찮으세요?”라는 한마디였다.')],
 ['돌아온 답장','첫날 우체국 앞에서 발견했던 편지의 발신인을 찾았습니다. 폭풍으로 흩어진 주민들의 안부를 모으던 전임 우체국장의 편지였습니다.',choice('답장을 모두 모아 책으로 만들자',{wisdom:20,community:1,town:8},'흩어졌던 이름들이 한 권의 책에서 다시 만났다.'),choice('다시 이어진 길을 지도에 남기자',{craft:20,freedom:1,town:8},'지도에 선 하나를 그을 때마다 누군가의 집이 가까워졌다.')],
 ['우리의 별자리','복원된 별시계가 마침내 빛납니다. 이 신호망을 누구의 손에 맡길지 결정할 시간이 왔습니다.',choice('주민들이 함께 운영하자',{community:2,town:12},'열쇠는 하나가 아니라 집집마다 하나씩 만들어졌다.'),choice('공개 규칙을 가진 우편 협회를 세우자',{order:2,wisdom:18},'누구에게나 같은 약속이 종이 위에 적혔다.')],
 ['빈칸이 있는 지도','먼 북쪽에서 새 우편망에 함께하고 싶다는 연락이 왔습니다. 우리 마을 밖에도 기다리는 마음이 많습니다.',choice('여행 우편대를 꾸리자',{freedom:2,brave:20},'가방 속에 지도와 아직 쓰지 않은 편지지를 넣었다.'),choice('여기서 모든 길을 잇자',{community:1,order:1,heart:20},'어디로 떠나든 돌아올 주소 하나는 남겨 두기로 했다.')],
 ['별빛 우체국','개국 기념일, 아이가 묻습니다. “이제 저는 무엇이 될 수 있을까요?” 당신은 빈 편지지 한 장을 건넵니다.',choice('네가 고른 길을 응원해',{bond:15,freedom:1},'미래의 첫 문장은 스스로 쓰기로 했다.'),choice('천천히 찾아도 괜찮아',{bond:15,community:1},'답을 서두르지 않는 봄이 다시 찾아왔다.')]
].map((c,i)=>({id:'chapter-'+i,title:c[0],body:c[1],choices:c.slice(2),chapter:i}));
const E=(id,name,tag,req,text)=>({id,name,tag,req,text});
export const ENDINGS=[
 E('postmaster','별빛 우체국장','마음을 잇는 사람',{heart:240,town:45,mail:20},'책상 위에는 배달을 기다리는 편지가 언제나 쌓여 있다. 당신과 함께 불을 켰던 아이는 이제 다른 이의 첫걸음을 맞이한다. 우체국 문에는 이렇게 적혀 있다. “아직 주소를 찾지 못한 마음도 환영합니다.”'),
 E('scholar','별의 기록자','배움의 끝에서',{wisdom:380,ruins:6},'낡은 별시계를 연구하던 작은 수첩은 세상의 신호를 기록하는 책이 되었다. 새로운 발견의 첫 장마다 우체국의 주소가 적힌다. 모르는 것이 많아질수록 세상이 더 넓어진다는 걸, 이제는 안다.'),
 E('inventor','새벽의 발명가','멈춘 것을 움직이다',{craft:380,sol:55},'새벽마다 공방 창문에 불이 켜진다. 자동 우편 분류기보다 먼저 완성한 것은 손이 불편한 이웃을 위한 손잡이였다. 솔은 웃으며 말한다. “네 발명에는 늘 받는 사람이 있구나.”'),
 E('ranger','초록길의 수호자','숲과의 약속',{brave:300,vigor:250,forest:8,yun:40},'어느 지도에도 없던 숲길에 작은 표지판이 섰다. 길을 지키는 사람은 길을 가장 빨리 걷는 사람이 아니라 마지막 여행자를 기다리는 사람이라는 걸, 새로운 길잡이들에게 가르친다.'),
 E('healer','달꽃 치유사','아픈 마음 곁에',{heart:350,wisdom:220},'진료실 창가에는 달꽃이 피어 있다. 처방전 뒤에는 늘 짧은 안부가 붙는다. 치료할 수 없는 슬픔 앞에서도 자리를 떠나지 않는 사람. 마을은 그 다정함을 오래 기억한다.'),
 E('artist','바람의 연주자','말 대신 선율로',{charm:380,heart:160},'첫 공연의 객석에는 빵집 앞 의자가 놓여 있었다. 이제 커다란 무대를 채우는 선율에도 그 작은 광장의 바람이 흐른다. 마지막 곡의 제목은 언제나 “집으로 가는 길”이다.'),
 E('baker','온기 제빵사','매일 아침의 기적',{craft:230,heart:230,dam:55,bakery:15},'이른 아침, 담과 함께 새 반죽을 만든다. 가게에는 값이 적히지 않은 빵 바구니가 하나 있다. 배고픈 누구라도 편지 한 줄을 남기고 가져갈 수 있다. 오늘도 바구니보다 방명록이 먼저 가득 찬다.'),
 E('captain','유리바다 항해사','수평선 너머로',{vigor:320,brave:280,coast:8},'우편선이 항구를 떠날 때, 갑판에서 작은 리본이 흔들린다. 파도는 여전히 두렵지만 이제 그 너머에 기다리는 사람이 있다는 걸 안다. 돌아올 때마다 바다 냄새가 나는 이야기를 한 아름 가져온다.'),
 E('envoy','마을의 중재자','서로 다른 목소리',{charm:300,wisdom:250,town:60},'원탁에는 높은 자리도 낮은 자리도 없다. 서로 다른 의견이 부딪힐 때마다 먼저 빈 찻잔을 채운다. 모든 문제를 해결하지는 못해도, 누구도 자기 목소리를 잃고 돌아가지는 않게 한다.'),
 E('merchant','구름길 상인','물건과 이야기를 싣고',{coins:2200,charm:200,craft:180},'작은 수레로 시작한 상단은 먼 마을을 잇는 길이 되었다. 장부에는 이익 옆에 다음 방문 때 물어볼 안부가 적힌다. 가장 귀한 물건은 팔고 남은 것이 아니라 길 위에서 얻은 신뢰였다.'),
 E('guardian','폭풍의 등대지기','돌아올 곳을 밝히다',{vigor:380,brave:220,town:40},'폭풍이 오는 밤에도 언덕 위 등대는 꺼지지 않는다. 몸을 단련했던 수많은 아침은 결국 누군가가 집으로 돌아오는 한순간을 위한 것이었다. 등대 아래에는 작은 우편함이 달려 있다.'),
 E('writer','편지 소설가','한 사람의 우주',{wisdom:260,charm:260,bond:70},'첫 소설에는 영웅 대신 답장을 기다리는 사람들이 등장한다. 독자들은 책을 덮고 오랫동안 연락하지 못한 이의 이름을 떠올린다. 헌사에는 단 한 문장이 적혀 있다. “나의 첫 이야기를 들어준 당신에게.”'),
 E('community','열린 별빛 연합','함께 만든 미래',{chapter:15,town:85,community:5,heart:300},'별시계의 불빛은 이제 여러 마을에서 동시에 켜진다. 누구 한 사람의 왕국도 아닌, 서로의 주소를 기억하는 연합. 오래전 비에 젖은 상자에서 시작된 약속은 수많은 손을 거쳐 오래도록 이어진다.'),
 E('architect','새 시대의 설계자','오래가는 약속',{chapter:15,order:5,wisdom:320,craft:280},'새 우편 협약의 첫 조항은 “모든 편지에는 지켜져야 할 마음이 있다”이다. 기술과 원칙이 함께 세운 신호망은 세월이 지나도 흔들리지 않는다. 설계도 한 귀퉁이에는 어린 시절의 낙서가 남아 있다.'),
 E('traveler','경계 없는 우편사','끝나지 않는 지도',{chapter:15,freedom:5,brave:320,forest:5,coast:5},'정해진 주소 대신 다음 만남을 향해 걷는다. 지도는 점점 커지지만 집으로 가는 길은 잊지 않는다. 우체국에 도착하는 편지마다 새로운 우표가 붙어 있다. 이야기는 끝났지만 여행은 계속된다.'),
 E('home','다정한 일상의 주인','평범해서 빛나는',{month:12,bond:90,heart:150},'특별한 직함 대신, 좋아하는 사람들과의 하루를 골랐다. 창가의 화분에 물을 주고 저녁에는 당신과 차를 마신다. 행복을 증명할 편지는 필요 없다. 문 안쪽에서 들리는 웃음이면 충분하다.'),
 E('mentor','작은 꿈의 선생님','다음 봄을 위해',{wisdom:230,heart:280,town:45},'우체국 다락방에 작은 교실이 생겼다. 처음 편지를 쓰는 아이에게 “틀려도 괜찮아”라고 말한다. 한때 자신에게 건네졌던 말을 이제 다른 목소리로 이어 간다. 교실 창문 너머로 봄이 온다.'),
 E('restorer','잃어버린 계절의 복원가','기억을 되찾다',{ruins:12,craft:300,wisdom:300},'유적에서 찾아낸 것은 보물보다 많은 일상의 흔적이었다. 누군가의 장보기 목록과 서툰 사랑의 문장을 정성스레 복원한다. 잊혔던 마을의 이름이 지도에 돌아온 날, 별시계는 한 번 더 울렸다.')
];
export function fresh(name='루미',seed=Date.now()){return {version:1,cosmetics:defaultCosmetics(),name:String(name).trim().slice(0,12)||'루미',month:0,coins:280,health:100,stress:0,bond:35,town:0,stats:{wisdom:20,vigor:25,heart:25,craft:15,charm:20,brave:15},friends:{sol:0,yun:0,dam:0},jobs:{},explores:{forest:0,ruins:0,coast:0},paths:{community:0,order:0,freedom:0},chapter:0,dream:'postmaster',xp:0,mastery:{},licenses:{wisdom:0,vigor:0,heart:0,craft:0,charm:0,brave:0},talents:[],requests:0,contract:null,materials:0,upgrades:[],policy:'balanced',approach:'careful',relationStories:{sol:0,yun:0,dam:0},awards:0,items:[],seed:seed>>>0||1,pending:CHAPTERS[0].id,ended:null,history:[],talkMonth:-1,plan:['mail','letters','rest']};}
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function rand(s){s.seed=(Math.imul(1664525,s.seed)+1013904223)>>>0;return s.seed/4294967296;}
export function value(s,k){if(k==='workTotal')return Object.values(s.jobs).reduce((a,b)=>a+b,0);if(k.startsWith('license_'))return s.licenses[k.slice(8)]||0;if(k.startsWith('mastery_'))return s.mastery[k.slice(8)]||0;if(k.startsWith('story_'))return s.relationStories[k.slice(6)]||0;return s.stats[k]??s.friends[k]??s.jobs[k]??s.explores[k]??s.paths[k]??s[k]??0;}
export function requirements(s,req={}){return Object.entries(req).every(([k,v])=>value(s,k)>=v);}
export function readyEndings(s){return ENDINGS.filter(e=>requirements(s,e.req));}
export function effect(s,e){for(const [k,v] of Object.entries(e)){if(k in s.stats)s.stats[k]=clamp(s.stats[k]+v,0,999);else if(k in s.friends)s.friends[k]=clamp(s.friends[k]+v,0,100);else if(k in s.paths)s.paths[k]=clamp(s.paths[k]+v,0,99);else if(['health','stress','bond'].includes(k))s[k]=clamp(s[k]+v,0,100);else if(k==='town')s.town=clamp(s.town+v,0,999);else if(k==='coins')s.coins=clamp(s.coins+v,0,9999999);}}
export function eventFor(s){
 if(!s.pending)return null;
 if(s.pending.startsWith('chapter-'))return CHAPTERS.find(c=>c.id===s.pending);
 if(s.pending==='festival')return {id:'festival',title:'별빛 축제',body:'계절마다 라이벌 아린과 실력을 겨룹니다. 경쟁 기록은 시간이 흐르며 850점까지 높아집니다. 어떤 행사에 참가할까요?',choices:[choice('공방 전시 · 솜씨 + 지혜',{},''),choice('광장 공연 · 표현 + 마음',{},''),choice('숲길 달리기 · 체력 + 용기',{},'')]};
 const events={
  bird:{title:'길 잃은 우편새',body:'창가에 젖은 우편새 한 마리가 앉았습니다. 발목에 작은 쪽지가 묶여 있어요.',choices:[choice('돌봐 준 뒤 돌려보내기',{heart:9,stress:-6},'따뜻해진 날개가 하늘로 올랐다.'),choice('쪽지의 주소를 함께 찾기',{wisdom:8,town:3},'우편새의 주인이 감사 편지를 보내왔다.')]},
  market:{title:'골목의 작은 장터',body:'이웃들이 장터를 열었습니다. 빈 가판대 하나를 함께 채워 달라고 합니다.',choices:[choice('손수 만든 물건을 팔기',{coins:45,craft:5},'첫 손님이 물건보다 포장에 담긴 마음을 칭찬했다.'),choice('노래로 손님을 맞기',{charm:8,town:3},'노래가 끝날 때쯤 골목이 북적였다.')]},
  rain:{title:'비 오는 날의 대화',body:'오늘은 우편함이 조용합니다. 차를 마시며 말없이 창밖을 바라봅니다.',choices:[choice('요즘의 고민 들어 주기',{bond:7,heart:6},'말하지 못한 마음까지 조금 가까워졌다.'),choice('다음 여행 이야기 나누기',{bond:4,brave:8},'지도 위에 가 보고 싶은 곳을 표시했다.')]},
  lost:{title:'돌아온 분실물',body:'한참 전에 배달했던 사람이 찾아왔습니다. 길에서 주운 수첩을 맡기고 갑니다.',choices:[choice('주인을 찾아 주기',{town:4,heart:7},'수첩 속 마지막 페이지에 감사의 말이 더해졌다.'),choice('우체국에 분실물 서랍 만들기',{craft:7,wisdom:5},'누군가의 잃어버린 하루를 보관하는 서랍이 생겼다.')]}
 };return {...events[s.pending],id:s.pending};
}
function record(s,line){s.history.unshift({month:s.month,text:line});s.history=s.history.slice(0,80);}
export function resolveEvent(state,index){let s=structuredClone(state);const e=eventFor(s);if(!e||!Number.isInteger(index)||!e.choices[index]||s.ended)throw Error('지금 선택할 수 없는 이야기입니다.');let reply=e.choices[index].reply;
 if(e.id==='festival'){
  const keys=[['craft','wisdom'],['charm','heart'],['vigor','brave']][index];const score=keys.reduce((a,k)=>a+s.stats[k],0);const target=Math.min(850,120+s.month*8);const won=score>=target;const prize=won?180:45;if(won)s.awards++;effect(s,{coins:prize,town:won?6:2,stress:-12});reply=`라이벌 아린의 기록 ${target}점, 나의 기록 ${score}점. ${won?'별빛 우승 메달':'참가 응원상'}을 받았습니다. 상금 ${prize}G!`;
 }else{effect(s,e.choices[index].effect);if(e.chapter!==undefined)s.chapter=e.chapter+1;}
 s.pending=null;record(s,e.title+' · '+reply);return {state:s,reply};
}
export function advance(state,plan){
 if(state.ended)throw Error('이미 선택한 미래입니다. 계속 육성으로 돌아갈 수 있어요.');if(state.pending)throw Error('먼저 도착한 이야기의 답장을 골라 주세요.');
 if(!Array.isArray(plan)||plan.length!==3||plan.some(id=>!ACTIONS.some(a=>a.id===id)))throw Error('일정 세 칸을 채워 주세요.');
 let s=structuredClone(state),logs=[];s.plan=[...plan];const before=structuredClone(s);
 for(let i=0;i<3;i++){
  let a=ACTIONS.find(x=>x.id===plan[i]);
  if(!requirements(s,a.require)){logs.push(`${a.name}: 아직 필요한 능력이 부족해 휴식했어요.`);a=ACTIONS.find(x=>x.id==='rest');}
  if(s.health<25&&a.stress>0){logs.push(`${a.name}: 건강이 낮아 회복을 먼저 했어요.`);a=ACTIONS.find(x=>x.id==='rest');}
  if((a.cost||0)>s.coins){logs.push(`${a.name}: 비용이 부족해 무료 휴식으로 바꿨어요.`);a=ACTIONS.find(x=>x.id==='rest');}
  s.coins-=a.cost||0;
  const tired=s.stress>=75;const level=masteryRank(s.mastery[a.id]||0);const boost=(a.group==='배움'&&s.items.includes('notebook')?2:0)+(a.group==='배움'&&s.policy==='curious'?2:0)+(a.group==='배움'&&s.talents.includes('learner')?2:0)+level;const repeated=plan.filter(id=>id===a.id).length===3;const mood=season(s).group===a.group?1:0;
  let gains={};for(const [k,v] of Object.entries(a.gain||{}))gains[k]=Math.max(1,Math.round((v*.75+boost+mood)*(tired?.55:1)*(repeated?.8:1)));
  effect(s,gains);const stress=(a.stress||0)+(a.group==='배움'&&s.policy==='curious'?3:0)-(s.policy==='gentle'?3:0)-(a.group==='쉼'&&s.upgrades.includes('garden')?8:0)-(s.talents.includes('steady')&&a.stress>0?2:0);effect(s,{stress,health:(a.health||0)+(a.group==='쉼'&&s.upgrades.includes('bed')?8:0),bond:a.bond||0,town:a.town||0});s.xp++;s.mastery[a.id]=(s.mastery[a.id]||0)+1;if(s.contract&&s.contract.action===a.id)s.contract.progress=Math.min(s.contract.need,s.contract.progress+1);
  if(a.friend)effect(s,{[a.friend]:2});
  let detail=Object.entries(gains).map(([k,v])=>`${STATS[k]} +${v}`).join(' · ');
  if(a.pay){const money=Math.round(a.pay*(1+level*.18)*(s.items.includes('ribbon')?1.15:1)*(s.policy==='diligent'?1.12:1)*(s.talents.includes('merchant')?1.12:1)*(tired?.7:1));s.coins+=money;s.jobs[a.id]=(s.jobs[a.id]||0)+1;detail+=` · +${money}G`;}
  if(a.explore){const k={forest:'brave',ruins:'wisdom',coast:'vigor'}[a.explore],threshold={forest:50,ruins:80,coast:60}[a.explore];const chance=Math.min(.96,.42+s.stats[k]/(threshold*3)+(s.items.includes('boots')?.15:0)+(s.approach==='careful'?.12:s.approach==='bold'?-.15:0)+(s.talents.includes('explorer')?.1:0));if(rand(s)<chance){s.explores[a.explore]++;s.coins+=25;const material=s.approach==='bold'?3:1;s.materials+=material;detail+=` · 탐사 성공, 발견 +1 · 부품 +${material} · +25G`;}else{const damage=s.approach==='bold'?16:8;effect(s,{health:-damage});detail+=` · 길을 살피고 돌아왔어요. 건강 −${damage}`;}}
  if(s.stress>=80){effect(s,{health:-12});detail+=' · 과로로 건강 −12';}
  if(masteryRank(s.mastery[a.id])>level)detail+=` · 숙련 ${MASTERY_NAMES[level+1]} 승급!`;logs.push(`${i+1}주 ${a.name} — ${detail}${tired?' (피로로 효율 감소)':''}${repeated?' (같은 활동 3회: 성장 효율 80%)':''}`);
 }
 s.month++;if(s.coins<35){s.coins+=20;logs.push('긴급 식사 지원 +20G (소지금 35G 미만)');}
 const living=35;if(s.coins>=living){s.coins-=living;logs.push('생활비 −35G');}else{s.coins=0;effect(s,{health:-5});logs.push('생활비 부족: 마을 식사 지원을 받았어요. 건강 −5');}
 effect(s,{bond:1});
 if(s.chapter<CHAPTERS.length&&s.month>=s.chapter*3)s.pending=CHAPTERS[s.chapter].id;
 else if(s.month%3===1&&s.month>1)s.pending='festival';
 else if(s.month%2===0)s.pending=['bird','market','rain','lost'][Math.floor(rand(s)*4)];
 const newly=readyEndings(s).filter(e=>!requirements(before,e.req));if(newly.length)logs.push('미래의 초대장: '+newly.map(e=>e.name).join(', '));
 for(const l of logs)record(s,l);
 return {state:s,logs,delta:Object.fromEntries(Object.keys(STATS).map(k=>[k,s.stats[k]-before.stats[k]])),newly:newly.map(e=>e.id)};
}
export function talk(state,who){let s=structuredClone(state);if(!PEOPLE[who]||s.ended)throw Error('지금 만날 수 없어요.');if(s.talkMonth===s.month)throw Error('이번 달에는 이미 이야기를 나눴어요. 다음 달에 다시 만나요.');effect(s,{[who]:6,[PEOPLE[who].stat]:3,stress:-5});s.talkMonth=s.month;record(s,PEOPLE[who].name+'와 마음을 나눴다. 친밀도 +6');return s;}
export function buy(state,id){let s=structuredClone(state),item=ITEMS.find(i=>i.id===id);if(!item||s.ended)throw Error('지금 구입할 수 없어요.');if(s.coins<item.price)throw Error('소지금이 부족해요.');if(item.permanent&&s.items.includes(id))throw Error('이미 가지고 있어요.');s.coins-=item.price;if(item.permanent)s.items.push(id);else effect(s,item.effect);record(s,item.name+' 구입');return s;}
export function finish(state,id){const e=ENDINGS.find(e=>e.id===id);if(!e||state.pending||state.ended||!requirements(state,e.req))throw Error('먼저 이야기와 엔딩 조건을 확인해 주세요.');const s=structuredClone(state);s.ended=id;record(s,e.name+'의 미래를 선택했다.');return s;}
export const LABELS={...STATS,coins:'소지금',bond:'우리의 유대',town:'마을 신뢰',month:'함께한 달',chapter:'이야기',sol:'솔 친밀도',yun:'윤 친밀도',dam:'담 친밀도',forest:'숲 탐사 성공',ruins:'유적 탐사 성공',coast:'해안 탐사 성공',mail:'편지 배달 횟수',bakery:'빵집 일 횟수',community:'공동체 선택',order:'질서 선택',freedom:'자유 선택'};
export function validateSave(input){
 if(!input||typeof input!=='object'||input.version!==1)throw Error('별빛 우체국 v1 저장 파일이 아니에요.');const s=fresh(input.name,1);s.cosmetics=validateCosmetics(input.cosmetics);
 const num=(v,min,max)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)throw Error('저장 파일의 수치가 올바르지 않아요.');return Math.floor(v);};
 for(const [k,max] of Object.entries({month:120000,coins:9999999,health:100,stress:100,bond:100,town:999,chapter:CHAPTERS.length,seed:4294967295}))s[k]=num(input[k],0,max);
 for(const [group,max] of Object.entries({stats:999,friends:100,explores:999999,paths:99}))for(const key of Object.keys(s[group]))s[group][key]=num(input[group]?.[key],0,max);
 s.jobs={};for(const a of ACTIONS.filter(a=>a.pay)){const n=input.jobs?.[a.id];if(n!==undefined)s.jobs[a.id]=num(n,0,999999);}
 if(!Array.isArray(input.items)||input.items.some(id=>!ITEMS.some(i=>i.id===id&&i.permanent)))throw Error('알 수 없는 소지품이에요.');s.items=[...new Set(input.items)];
 if(!ENDINGS.some(e=>e.id===input.dream))throw Error('꿈 정보가 올바르지 않아요.');s.dream=input.dream;
 s.talkMonth=num(input.talkMonth,-1,s.month);
 const events=['bird','market','rain','lost','festival',...CHAPTERS.map(c=>c.id)];if(input.pending!==null&&!events.includes(input.pending))throw Error('알 수 없는 이야기예요.');s.pending=input.pending;
 if(s.pending?.startsWith('chapter-')&&s.pending!==CHAPTERS[s.chapter]?.id)throw Error('이야기 진행 순서가 맞지 않아요.');
 for(const [k,max] of Object.entries({xp:999999,requests:999999,materials:999999,awards:999999}))s[k]=num(input[k],0,max);
 for(const k of Object.keys(STATS))s.licenses[k]=num(input.licenses?.[k],0,3);
 for(const k of Object.keys(PEOPLE))s.relationStories[k]=num(input.relationStories?.[k],0,3);
 s.mastery={};for(const a of ACTIONS){if(input.mastery?.[a.id]!==undefined)s.mastery[a.id]=num(input.mastery[a.id],0,999999);}
 for(const [key,defs] of [['talents',TALENTS],['upgrades',UPGRADES]]){if(!Array.isArray(input[key])||input[key].some(id=>!defs.some(d=>d.id===id)))throw Error('성장 정보가 올바르지 않아요.');s[key]=[...new Set(input[key])];}
 if(s.talents.length>Math.floor(s.xp/30))throw Error('특성 포인트가 맞지 않아요.');
 if(!['balanced','curious','gentle','diligent'].includes(input.policy)||!['careful','balanced','bold'].includes(input.approach))throw Error('육성 방침이 올바르지 않아요.');s.policy=input.policy;s.approach=input.approach;
 if(input.contract!==null){const c=input.contract;if(!c||!ACTIONS.some(a=>a.id===c.action)||typeof c.title!=='string')throw Error('의뢰 정보가 올바르지 않아요.');s.contract={action:c.action,title:c.title.slice(0,80),need:num(c.need,2,10),progress:num(c.progress,0,c.need),reward:num(c.reward,0,1000)};}
 if(input.ended!==null&&!ENDINGS.some(e=>e.id===input.ended))throw Error('알 수 없는 미래예요.');s.ended=input.ended;
 if(s.ended&&(!requirements(s,ENDINGS.find(e=>e.id===s.ended).req)||s.pending))throw Error('엔딩 저장 조건이 맞지 않아요.');
 if(!Array.isArray(input.plan)||input.plan.length!==3||input.plan.some(id=>!ACTIONS.some(a=>a.id===id)))throw Error('일정 정보가 올바르지 않아요.');s.plan=input.plan;
 s.history=Array.isArray(input.history)?input.history.slice(0,80).filter(h=>h&&Number.isInteger(h.month)&&typeof h.text==='string').map(h=>({month:h.month,text:h.text.slice(0,400)})):[];
 return s;
}
export const MASTERY_NAMES=['입문','견습','숙련','전문','달인'];
export function masteryRank(n){return n>=40?4:n>=24?3:n>=12?2:n>=4?1:0;}
export function season(s){return [{name:'봄',group:'배움',desc:'새로운 호기심 · 배움 성장 +1'},{name:'여름',group:'탐험',desc:'먼 길의 부름 · 탐험 성장 +1'},{name:'가을',group:'일',desc:'수확의 계절 · 일 성장 +1'},{name:'겨울',group:'쉼',desc:'따뜻한 시간 · 쉼 성장 +1'}][Math.floor(s.month%12/3)];}
export const COURSES={wisdom:'letters',vigor:'exercise',heart:'herbs',craft:'workshop',charm:'music',brave:'debate'};
export const TALENTS=[{id:'learner',name:'끝없는 호기심',desc:'배움으로 얻는 능력치 +2',icon:'book'},{id:'merchant',name:'야무진 일꾼',desc:'모든 일 보수 +12%',icon:'coin'},{id:'steady',name:'꾸준한 호흡',desc:'활동의 스트레스 증가 −2',icon:'heart'},{id:'explorer',name:'길을 읽는 눈',desc:'탐험 성공률 +10%',icon:'compass'},{id:'friend',name:'마음을 여는 말',desc:'월간 대화 친밀도 추가 +3',icon:'chat'}];
export const UPGRADES=[{id:'garden',name:'달꽃 정원',price:240,material:4,desc:'쉼 활동의 스트레스 회복 +8',icon:'leaf'},{id:'bed',name:'포근한 다락방',price:280,material:5,desc:'쉼 활동의 건강 회복 +8',icon:'moon'}];
export function examRequirements(s,k){const rank=s.licenses[k]||0;return rank>=3?null:{[k]:[110,450,720][rank],['mastery_'+COURSES[k]]:[8,36,64][rank]};}
export function exam(state,k){let s=structuredClone(state);if(!(k in COURSES)||s.ended)throw Error('응시할 수 없는 시험입니다.');const req=examRequirements(s,k),cost=[80,150,250][s.licenses[k]];if(!req||!requirements(s,req))throw Error('먼저 수업 횟수와 능력 조건을 갖춰 주세요.');if(s.coins<cost)throw Error('응시료가 부족해요.');s.coins-=cost;s.licenses[k]++;effect(s,{town:4,bond:2});record(s,`${STATS[k]} ${s.licenses[k]}급 자격 시험 합격!`);return s;}
export function learnTalent(state,id){const s=structuredClone(state);if(s.ended||!TALENTS.some(t=>t.id===id)||s.talents.includes(id)||Math.floor(s.xp/30)<=s.talents.length)throw Error('사용할 수 있는 특성 포인트가 없어요.');s.talents.push(id);record(s,TALENTS.find(t=>t.id===id).name+' 특성을 배웠다.');return s;}
export function upgrade(state,id){const s=structuredClone(state),u=UPGRADES.find(u=>u.id===id);if(!u||s.ended||s.upgrades.includes(id))throw Error('이미 완성했거나 이용할 수 없어요.');if(s.coins<u.price||s.materials<u.material)throw Error('소지금 또는 탐험 부품이 부족해요.');s.coins-=u.price;s.materials-=u.material;s.upgrades.push(id);record(s,u.name+' 완성');return s;}
export function contracts(s){const pool=[['mail','언덕마을의 안부'],['bakery','축제의 빵 바구니'],['volunteer','도움이 필요한 이웃'],['letters','오래된 편지 정리'],['forest','숲길의 작은 표식'],['workshop','느린 시계 수리'],['music','마을의 작은 음악회'],['exercise','우편대 체력 훈련']];return [0,1,2].map(i=>{let [action,title]=pool[(s.requests+i)%pool.length],need=2+Math.min(3,Math.floor(s.requests/4));return {action,title,need,progress:0,reward:80+need*15};});}
export function acceptContract(state,index){const s=structuredClone(state);if(s.contract||s.ended||![0,1,2].includes(index))throw Error('진행 중인 의뢰를 먼저 끝내 주세요.');s.contract=contracts(s)[index];return s;}
export function claimContract(state){const s=structuredClone(state);if(s.ended||!s.contract||s.contract.progress<s.contract.need)throw Error('의뢰의 활동 횟수를 채워 주세요.');s.coins+=s.contract.reward;effect(s,{town:5});s.materials++;s.requests++;record(s,`의뢰 완료: ${s.contract.title} · ${s.contract.reward}G, 부품 +1, 신뢰 +5`);s.contract=null;return s;}
export const RELATION_SCENES={
 sol:[['처음 실패한 발명','솔은 완성되지 않은 기계를 천으로 덮어 두었습니다. “계속 실패하니까, 재능이 없는 건가 싶어.”','실패한 부분을 함께 기록하자','오늘은 쉬고 내일 다시 해 보자'],['아버지의 공구함','물려받은 공구함 속에는 솔이 어린 시절 그린 서툰 설계도가 들어 있습니다. “버리신 줄 알았는데, 다 모아 두셨네.”','그림을 공방에 걸어 두자','그때의 발명을 다시 만들어 보자'],['둘이 만든 새벽','완성된 통신기가 첫 신호를 보냅니다. 솔이 공구를 내려놓고 말합니다. “혼자였다면 여기까지 못 왔을 거야.”','다음 발명도 함께하자','이 기술을 마을에 선물하자']],
 yun:[['지도 밖의 두려움','늘 씩씩하던 윤도 처음 걷는 산길 앞에서는 잠시 멈춥니다. “길을 잃는 건 아직도 무서워.”','함께 표식을 남기며 가자','오늘은 안전한 길부터 익히자'],['돌아오지 않은 나침반','윤은 옛 스승의 나침반을 찾고 있습니다. 마지막으로 함께 갔던 계곡은 이제 수풀이 가득합니다.','기억나는 길을 같이 그리자','스승을 기억하는 사람들을 만나자'],['길을 나누는 사람','새 길잡이들이 윤을 찾아옵니다. 윤은 한 사람을 앞으로 세우는 대신 모두에게 지도 한 장씩을 건넵니다.','첫 수업에 함께 가자','우체국을 쉼터로 열자']],
 dam:[['오늘의 첫 손님','담은 하루 종일 손님이 없었다며 남은 빵을 세고 있습니다. 그래도 문 앞 화분에는 물을 줍니다.','함께 시식회를 열자','내가 첫 손님이 될게'],['레시피의 빈칸','담이 찾던 가족의 빵 조리법에는 마지막 재료가 지워져 있습니다. 기억 속 향기를 떠올리며 몇 번이고 다시 굽습니다.','서로 기억하는 맛을 적어 보자','새로운 우리만의 맛을 만들자'],['누구나 앉는 식탁','빵집 뒤뜰에 긴 식탁이 놓였습니다. 담은 말합니다. “이제 가게보다 집 같아. 모두가 돌아오는 집.”','매주 함께 저녁을 준비하자','멀리 사는 이웃에게 초대장을 쓰자']]
};
export function relationEvent(s,who){const n=s.relationStories[who];if(!PEOPLE[who]||n>=3||s.friends[who]<[25,55,85][n])return null;const c=RELATION_SCENES[who][n];return {title:c[0],body:c[1],choices:c.slice(2)};}
export function resolveRelation(state,who,index){const s=structuredClone(state);if(s.ended||![0,1].includes(index)||!relationEvent(s,who))throw Error('아직 이 추억을 만들 준비가 되지 않았어요.');const e=relationEvent(s,who);s.relationStories[who]++;effect(s,{[who]:5,[index===0?PEOPLE[who].stat:'heart']:12,bond:3});record(s,`${PEOPLE[who].name}와의 추억: ${e.title} · ${e.choices[index]}`);return s;}
const ENDING_LICENSES={postmaster:'heart',scholar:'wisdom',inventor:'craft',ranger:'brave',healer:'heart',artist:'charm',baker:'craft',captain:'vigor',envoy:'charm',merchant:'craft',guardian:'vigor',writer:'wisdom',community:'heart',architect:'wisdom',traveler:'brave',home:'heart',mentor:'wisdom',restorer:'craft'};
for(const e of ENDINGS){delete e.req.month;Object.assign(e.req,{workTotal:60,requests:10,chapter:Math.max(e.req.chapter||0,12),['license_'+ENDING_LICENSES[e.id]]:['community','architect','traveler','restorer'].includes(e.id)?3:2});}
ENDINGS.find(e=>e.id==='inventor').req.story_sol=3;ENDINGS.find(e=>e.id==='ranger').req.story_yun=3;ENDINGS.find(e=>e.id==='baker').req.story_dam=3;
ENDINGS.find(e=>e.id==='artist').req.awards=3;ENDINGS.find(e=>e.id==='guardian').req.awards=2;
Object.assign(LABELS,{workTotal:'일 경험',requests:'완료한 의뢰',awards:'축제 우승',xp:'활동 경험',materials:'탐험 부품'});
for(const k of Object.keys(STATS))LABELS['license_'+k]=STATS[k]+' 자격 등급';
for(const a of ACTIONS)LABELS['mastery_'+a.id]=a.name+' 수련';
for(const k of Object.keys(PEOPLE))LABELS['story_'+k]=PEOPLE[k].name+' 관계 이야기';
