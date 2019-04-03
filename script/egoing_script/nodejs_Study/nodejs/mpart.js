var m = {
  v: "v",
  f: function() {
    console.log(this.v);
  }
};
//mpart 파일뿐만이 아니라 다른 곳에서도 사용할 수 있게 할것이다!
//(m을 다른곳에서도 사용해!)
module.exports = m;
