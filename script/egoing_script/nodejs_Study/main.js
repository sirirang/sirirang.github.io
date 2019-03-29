var http = require("http");

function templateHtml(title, body, list) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
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

var fs = require("fs");
var url = require("url");

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
            list
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found remove!");
  }
});
app.listen(3000);
