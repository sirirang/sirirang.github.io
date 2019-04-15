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
  list: function(topics) {
    var list = `<ul>`;
    for (var i = 0; i < topics.length; i++) {
      list =
        list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
    }
    list = list + `</ul>`;
    return list;
  },
  authorSelect: function(author, author_id){
    var tag = '';
    for(var i =0; i < author.length;i++) {
        var selected = '';
        if(author[i].id === author_id){
            selected = ` selected`
        }
        tag += `<option value="${author[i].id}" ${selected}>${author[i].name}</option>`
        
    }
    return `
    <select name="author">
        ${tag}
    </select>
    `
  }
};

module.exports = template;
