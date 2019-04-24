var http = require("http");
var url = require("url");
var topic = require("./lib/topic");
var authors = require("./lib/authors");
var cookie = require("cookie");
const port = 4000;

function authIsOwner(request,response){
    var isOwner = false;
    var cookies = {};
    if(request.headers.cookie){
        var cookies = cookie.parse(request.headers.cookie);
    }
    if(cookies.email === `siri` && cookies.password === `1111`){
        isOwner = true;
    }
    return isOwner;
}

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
  var title = queryData.id;
  var isOwner = authIsOwner(request,response);
  console.log(isOwner);
  if (pathName === "/") {
    if (title === undefined) {
        topic.home(request, response);
    } else {
        topic.page(request, response, queryData);
    }
  } else if (pathName === "/create") {
        topic.create(request, response);
  } else if (pathName === "/create_process") {
        topic.create_process(request, response);
  } else if (pathName === "/update") {    
        topic.update(request, response, queryData);
  } else if (pathName === `/update_process`) {
        topic.update_process(request, response);
  } else if (pathName === `/delete_process`) {
        topic.delete(request,response);
  } else if (pathName === `/authors`) {
        authors.home(request,response);
  } else if (pathName === `/authors/creat_process`) {
        authors.create_process(request,response);
  } else if (pathName === "/authors/update") {    
        authors.update(request, response, queryData);
  } else if (pathName === `/authors/update_process`) {
        authors.update_process(request,response); 
  } else if (pathName === `/authors/delete_process`) {
        authors.delete(request,response);
  } else if (pathName === `/login`) {
        topic.login(request, response);
  } else if (pathName === `/login_process`) {
        topic.login_process(request,response);
  }  else {
    response.writeHead(404);
    response.end("Not found remove!");
  }
});
app.listen(port,function(){
    console.log(`http://localhost:${port}`)
});
