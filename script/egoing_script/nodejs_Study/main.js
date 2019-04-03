var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
var sanitizeHtml = require("sanitize-html");

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
  var title = queryData.id;
  console.log("결과:" + pathName);

  if (pathName === "/") {
    if (title === undefined) {
      fs.readdir("./data", function(err, flielist) {
        var title = "welcome";
        var description = "Hello World!";
        // 이전과 비교하기 위해 이전 코딩 주석처리
        // 동작은 같지만 코드의 가독성을 높이는 것 : 리펙토링
        // var list = templateList(flielist);
        // var template = templateHtml(
        //   title,
        //   `<h2>${title}</h2>
        //   <p>${description}</p>`,
        //   `<a href="/create" title="create">create</a>`,
        //   list
        //   );
        //   response.writeHead(200);
        //   response.end(template);

        var list = template.list(flielist);
        var html = template.HTML(
          title,
          `<h2>${title}</h2>
            <p>${description}</p>`,
          `<a href="/create" title="create">create</a>`,
          list
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir("./data", function(err, flielist) {
        fs.readFile(`data/${title}`, "utf8", function(err, data) {
          var list = template.list(flielist);
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedData = sanitizeHtml(data, {
            allowedTags: ["h1", "strong"]
          });
          var html = template.HTML(
            title,
            `<h2>${sanitizedTitle}</h2>
             <p>${sanitizedData}</p>`,
            `<a href="/create" title="create">create</a> 
            <a href="/update?id=${sanitizedTitle}" title="update">update</a>
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}" />
              <input type="submit" value="delete">
            </form>`,
            list
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathName === "/create") {
    fs.readdir("./data", function(err, flielist) {
      var title = "WEB - create";
      var list = template.list(flielist);
      var html = template.HTML(
        title,
        `<form action="/create_process" method="POST">
          <p><input type="text" name="title" placeholder="title"/></p>
          <p><textarea name="desc01" id="" cols="30" rows="10" placeholder="description"></textarea></p>
          <p>
            <input type="submit" />
          </p>
        </form>`,
        list,
        ""
      );
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathName === "/create_process") {
    var body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
      var title = post.title;
      var desc = post.desc01;
      fs.writeFile(`data/${title}`, `${desc}`, "utf8", function(err) {
        response.writeHead(302, { location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathName === "/update") {
    fs.readdir("./data", function(err, flielist) {
      fs.readFile(`data/${title}`, "utf8", function(err, data) {
        var title = queryData.id;
        var list = template.list(flielist);
        var description = data;
        var html = template.HTML(
          title,
          `
          <form action="/update_process" method="POST">
            <input type="hidden" name="id" value="${title}" /> 
            <p><input type="text" name="title" placeholder="title" value="${title}"/></p>
            <p><textarea name="desc01" id="" cols="30" rows="10" placeholder="description">${description}</textarea></p>
            <p>
              <input type="submit" />
            </p>
          </form>
          `,
          `<a href="/create" title="create">create</a> 
          <a href="/update?id=${title}" title="update">update</a>`,
          list
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathName === `/update_process`) {
    var body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var desc = post.desc01;
      fs.rename(`data/${id}`, `data/${title}`, function(err) {
        fs.writeFile(`data/${title}`, `${desc}`, "utf8", function(err) {
          response.writeHead(302, { location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathName === `/delete_process`) {
    var body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function(err) {
        response.writeHead(302, { location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found remove!");
  }
});
app.listen(3000);
