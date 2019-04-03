// 객체가 많아 지면 정리 할 필요성이 생긴다
// 객체 많음 => 모듈화 시키자!

// 하단의 함수를 가져오려고 한다면 require를 써서 불러온다
// var m = {
//   v: "v",
//   f: function() {
//     console.log(this.v);
//   }
// };

var part = require("./mpart.js");
console.log(part);
part.f();
