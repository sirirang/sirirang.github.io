헷갈리는 것들 정리

- 동기와 비동기  
  예시용 코드

function callBack(){
console.log("responese ok");
}

fetch('html').then(callBack);
console.log("1");
console.log("2");

- 동기 실행일경우  
  fetch로 html 파일을 불러온 후 callback 함수 실행 뒤 하단에 있는 console.log실행

-비동기 실행 일 경우  
fetch가 불러오기 중에  
console.log실행  
 비동기는 내가 요청한거 이전에 다른 것들을 우선적으로 실행 할 수 있음

익명함수는 해당 내에 클래스..? 인 곳에서 한번만 실행될 경우에 사용

예제 함수

fetch('html').then(function(response){
console.log(response);
});

fetch 사용설명서에 보면 reponse는 통신(fetch)를 할시에 여러가지 정보를 가져올 수
있다. ex)http status 정보 등등
