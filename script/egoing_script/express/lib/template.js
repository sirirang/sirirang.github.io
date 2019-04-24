module.exports = {
  HTML:function(title, list, body, control, authStatusUI = `<a href="/auth/login" title="">Login</a>`){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="/css/common.css" type="text/css">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        ${authStatusUI}
        ${list}
        ${control}
        ${body}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
