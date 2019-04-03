// 객체와 object차이

//객체
var members = ["egoing", "test", "test01"];
console.log(members[1]); //test

//객체 전체 출력
for (var i = 0; i < members.length; i++) {
  console.log(`객체 값 : ${members[i]}`);
}

//object

var roles = {
  programmer: "egoing",
  designer: "test1",
  manager: "test2"
};
console.log(`object값 (방법1): ${roles.designer}`); // yi 방법 1
console.log(`object값 (방법2): ${roles["designer"]}`); // yi 방법2

//object 반복분
//object 반복시에는 in!!! 이라는 것을 꼭 써야한다
for (var name in roles) {
  console.log(`object 값이 저장되는 키값 : ${name}`); //저장하는 값들의 이름이 나온다 ex)programmer,designer,manager등 key 가 들어오도록 함
}

//value 값을 원할땐?  name 부분은 변경가능하다
for (var name in roles) {
  console.log(`object에 저장되는 value값 : ${roles[name]}`, `키값 : ${name}`);
}

//변수 변경
for (var n in roles) {
  console.log(`object에 저장되는 value값(변수 변경) : ${roles[n]}`);
}
