const http =  require('http');
//쿠키 값을 읽을 수 있도록 해주는 패키지
const cookie = require('cookie');
const port = 5000;

http.createServer(function(req, res){
    var cookies = {};
    if(req.headers.cookie !== undefined){
        cookies = cookie.parse(req.headers.cookie);
        console.log(cookies);
    }
    res.writeHead(200,{
            'Set-Cookie': [
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookis; Max-Age=${60*60*24*30}`,
            `Secure=test; Secure`, //현재 Network 에 response 쪽은 나오지만 request 쪽에서는 확인이 되지 않는다.
            'HttpOnly=test2; HttpOnly', //해당내용을 console.log 쪽에서 확인이 불가능 하다.
            'Path=test3; Path=/cookie',
            'Domain=test4; Domain=o2.org'
        ]
    });
    res.end('cookie!!!');
}).listen(port);

//세션쿠키는 브라우저를 껏다키면 사라짐
//퍼머넌트 쿠키는 껐다 켜도 살아있음
//Expires => 언제 쿠키가 만료 될 것인가
//Max-Age => 얼마동안 쿠키가 살아 있을 것인가
//Secure => https 일 경우에만 값 전달 우측 맨마지막에 Secure를 붙인다.
//HttpOnly => 웹서버와 웹브라우저가 통신할 때만 값을 전달 할 수 있다.
//Path =>내가 원하는 path에서만 해당 cookie가 보일 수 있도록하는것, 해당 부분의 하위까지 해당 쿠키 사용가능 
//Domain=> 내가 원하는 도메인 에서만 해당 cookie가 보일 수 있도록 하는 것