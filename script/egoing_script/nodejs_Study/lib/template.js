var template = {
  HTML: function(title, body, list, control) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${control}    
        ${list}
        ${body}
      </body>
      </html>`;
  },
  list: function(flielist) {
    var list = `<ul>`;
    for (var i = 0; i < flielist.length; i++) {
      list = list + `<li><a href="/?id=${flielist[i]}">${flielist[i]}</a></li>`;
    }
    list = list + `</ul>`;
    return list;
  }
};

module.exports = template;
