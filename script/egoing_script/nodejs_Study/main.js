var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

function templateHtml(title, body, list, control) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${control}    
    ${list}
    ${body}
  </body>
  </html>`;
}

function templateList(flielist) {
  var list = `<ul>`;
  for (var i = 0; i < flielist.length; i++) {
    list = list + `<li><a href="/?id=${flielist[i]}">${flielist[i]}</a></li>`;
  }
  list = list + `</ul>`;
  return list;
}

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
        var list = templateList(flielist);
        var template = templateHtml(
          title,
          `<h2>${title}</h2>
            <p>${description}</p>`,
          `<a href="/create" title="create">create</a>`,
          list
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function(err, flielist) {
        fs.readFile(`data/${title}`, "utf8", function(err, data) {
          var list = templateList(flielist);
          var description = data;
          var template = templateHtml(
            title,
            `<h2>${title}</h2>
             <p>${description}</p>`,
            `<a href="/create" title="create">create</a> 
            <a href="/update?id=${title}" title="update">update</a>
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${title}" />
              <input type="submit" value="delete">
            </form>`,
            list
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathName === "/create") {
    fs.readdir("./data", function(err, flielist) {
      var title = "WEB - create";
      var list = templateList(flielist);
      var template = templateHtml(
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
      response.end(template);
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
        var list = templateList(flielist);
        var description = data;
        var template = templateHtml(
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
        response.end(template);
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
