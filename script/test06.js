function return_test(){
    return;
    console.log("실행되지 않는 코드");
    /* 리턴을 바로 만나서 결과 값이 없음 */
};

function print_test(message){
    console.log("print function in");
    console.log(message);
    console.log("print function out");
    /* 반환값 언디파인드 */
};

function sum(num1,num2){
    var result = num1 + num2;
    return result;
    /*반환값 입력한 숫자의 합*/
}