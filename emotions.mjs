export function emotionFor(state, greeted=false){
 if(state.health<40)return {id:'tired',label:'많이 피곤해요',line:greeted?'곁에 있어 줘서 고마워요. 오늘은 푹 쉬고 싶어요.':'눈이 자꾸 감겨요… 다음 일정에는 쉬는 시간을 넣어 주실래요?'};
 if(state.stress>=65)return {id:'sad',label:'마음이 지쳤어요',line:greeted?'이야기를 들어 줘서 고마워요. 조금 천천히 해도 괜찮죠?':'잘하고 싶은데 마음처럼 안 돼요. 산책하면서 기분을 풀고 싶어요.'};
 if(greeted)return {id:'happy',label:'함께라서 기뻐요',line:'불러 주니까 기분이 좋아졌어요! 오늘도 함께해요.'};
 const worked=state.history?.some(h=>h.month===state.month && /주 .* · \+\d+G/.test(h.text));
 if(worked)return {id:'happy',label:'해내서 뿌듯해요',line:'제가 번 돈으로 다음 꿈을 준비할 수 있겠죠? 오늘도 열심히 했어요!'};
 if(state.bond>=70||(state.health>=80&&state.stress<=20))return {id:'happy',label:'기분이 좋아요',line:'오늘은 왠지 좋은 일이 생길 것 같아요. 같이 새로운 걸 해 볼까요?'};
 return {id:'neutral',label:'차분한 하루예요',line:'오늘은 어떤 편지를 만나게 될까요? 차근차근 해 볼게요.'};
}
