var v1 = "v1";
//1만개 코드가 있다고 가정
v1 = "egoing"; //v1을 다른 변수로 적용
var v2 = "v2";

//그에 대한 해결책 => object 에 정리 (함수도 포함)

var object = {
  v1: "v1",
  v2: "v2",
  f1: function() {
    console.log(object.v1); //해당 안에 있는것을 참조할때 object 라고 사용하면 번거로움
    console.log(this.toString());
    console.log(this.v1); //그래서 this 라는 것을 사용하여 해당 안에 있는 객체를 확인한다.
  },
  f2: function() {
    console.log(object.v1);
  }
};

object.f1();
object.f2();
