var fs = require("fs");

//동기적 작업
console.log("A");
var result = fs.readFileSync("syntax/sample.txt", "utf8");
console.log(result);
console.log("C");
// 결과 A->B->C

//비동기적 작업
console.log("A");
fs.readFile("syntax/sample.txt", "utf8", function(err, result) {
  console.log(result);
});
console.log("C");
// 결과 A->C->B

//성능을 올리려면 되도록 비동기적 방식으로 작업을 진행해야한다.

// callback 함수 ex)
// fs.readFile("syntax/sample.txt", "utf8", function(err, result) {
//   console.log(result);
// });

// 노드야 파일을 불러온 후에 그다음에 뒤에 있는 함수를 실행시켜줘
