//이전에 알고 있었던 방법
var name = "siri";
var name2 = "bixby";

var text = "hello my name is " + name + " please don't call me " + name2;

//template literal
var text2 = `hello my name is ${name} 
please don't call me ${name2}`;

console.log(text);
console.log(text2);
