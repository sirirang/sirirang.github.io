var sanitizeHtml = require("sanitize-html");

var template = {
  HTML: function(title, body, list, control) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
        <style>
            .tbl_author{border-collapse: collapse;}
            .tbl_author td{border: 1px solid #000;}
        </style>
      </head>
      <body>
        <a href="/login" title="">login</a>
        <h1><a href="/">WEB</a></h1>
        <a href="/authors">Authors</a>
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
        list + `<li><a href="/?id=${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
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
        tag += `<option value="${author[i].id}"${selected}>${sanitizeHtml(author[i].name)}</option>`
        
    }
    return `
    <select name="author">
        ${tag}
    </select>
    `
  },
  authorlist : function(authors){
    var author_list = `<table class="tbl_author">`;
            for(var i =0; i < authors.length; i++){
                author_list += `
                                <tr>
                                    <td>${authors[i].name}</td>
                                    <td>${authors[i].profile}</td>
                                    <td><a href="/authors/update?id=${authors[i].id}">Update</a></td>
                                    <td>
                                        <form action="/authors/delete_process" method="post">
                                            <input type="hidden" name="id" value="${authors[i].id}" />
                                            <input type="submit" value="delete">
                                        </form>
                                    </td>
                                </tr>
                                `
            }
    author_list += `</table>` ;
    return author_list;
  }

};

module.exports = template;
