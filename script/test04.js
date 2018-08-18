/* 객체만들기 */
var empty_obj = {};
console.log(typeof(empty_obj));
var man = {name:"홍길동", age:20, height:180};
/* 
객체 접근하는 방법
1) 객체이름.속성이름
ex) man.name
2) 객체이름["속성이름"]
ex) man["name"]
*/
console.log(man.name);
console.log(man["age"]);
console.log(man);
man.name = "이몽룡";
man["age"] = 15;
console.log(man);



/* 값이 없는 경우  */

var unseting; // undefined
var obj = {
            x : 1,
            y : 2
};
var null_var = null;
console.log(null_var);
console.log(typeof(null_var));

