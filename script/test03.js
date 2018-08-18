var height = prompt("키를 입력해 주세요.");
/* 문자열 출력이 됨 */
console.log(height,typeof(height));
/* 정수 부분 추출 (문자 입력시에도 문제 없음)-[맨 처음이 숫자가 아닌경우 인식 x] */
var height_int = parseInt(height);
console.log(height_int,typeof(height_int));
/* 실수 부분 출력 (문자 입력시에도 문제 없음)-[맨 처음이 숫자가 아닌경우 인식 x] */
var height_float = parseFloat(height);
console.log(height_float,typeof(height_float));