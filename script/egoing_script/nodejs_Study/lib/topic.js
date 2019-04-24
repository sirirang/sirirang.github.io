var qs = require("querystring");
var db = require("./db_info");
var template = require("./template.js");
var sanitizeHtml = require("sanitize-html");

exports.home = function(request, response){
    db.query(`select * from topic`, function(err, topics) {
        if (err) {
          console.log(`Error!!`);
        }
        // console.log(topics);
        var title = "welcome";
        var description = "Hello World!";
        var list = template.list(topics);
        var html = template.HTML(
          title,
          `<h2>${sanitizeHtml(title)}</h2>
            <p>${sanitizeHtml(description)}</p>`,
          `<a href="/create" title="create">create</a>`,
          list
        );
        response.writeHead(200);
        response.end(html);
    });
}

exports.page = function(request, response, queryData){
    db.query(`select * from topic`, function(err, topics) {
        if (err) {
          console.log(`Error!!`);
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?`, [queryData.id],function(err2,topic) {
          if (err2) {
            console.log(`Error2`);
          }
          //   console.log(topic)
        //   console.log(`topic내용!!!!!!!`);
        console.log(topic);
        //   console.log(topic[0].title);
          console.log(`topic title내용!!!!!!!`);
          console.log(queryData.id);
          var title = topic[0].title;
          var description = topic[0].description;
          var writer = topic[0].name;
          var list = template.list(topics);
          var html = template.HTML(
            ``,
            `<h2>${sanitizeHtml(title)}</h2>
            <p>${sanitizeHtml(description)}</p>
            <p>${sanitizeHtml(writer)}</p>
            `,
            `<a href="/create" title="create">create</a>
            <a href="/update?id=${queryData.id}" title="update">update</a>
             <form action="/delete_process" method="post">
               <input type="hidden" name="id" value="${queryData.id}" />
               <input type="submit" value="delete">
             </form>`,
            list
          );
          response.writeHead(200);
          response.end(html);
        });
      });
}

exports.create = function(request, response){
    db.query(`select * from topic`, function(err, topics) {
        if (err) {
          console.log(`Error!!`);
        }
        db.query(`SELECT * FROM author`,function(err,author){
          var title = "Create";
          var list = template.list(topics);
          var authorSelect = template.authorSelect(author);
          var html = template.HTML(
              title,
              `<h2>${sanitizeHtml(title)}</h2>
              <form action="/create_process" method="POST">
              <p><input type="text" name="title" placeholder="title"/></p>
              <p><textarea name="desc01" id="" cols="30" rows="10" placeholder="description"></textarea></p>
              <p>
                  ${authorSelect}
              </p>
              <p>
                  <input type="submit" />
              </p>
              </form>`,
              `<a href="/create" title="create">create</a>`,
              list
          );
          response.writeHead(200);
          response.end(html);
        });     
      });
}

exports.create_process = function(request, response){
    var body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
      db.query(
        `INSERT INTO topic(title, description, created, author_id) VALUES(?,?,NOW(),?)`,
        [post.title, post.desc01, post.author],
        function(err, result) {
          if (err) {
            console.log(`ERROR!!!`);
          }
          response.writeHead(302, { location: `/?id=${result.insertId}` });
          response.end();
        }
      );
    });
}

exports.update = function(request, response, queryData){
    db.query(`SELECT * FROM topic`,function(err,topics){
        if(err){
            console.log(`ERROR!! 1`);
        }
        db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function(err2,topic){
            if(err2){
                console.log(`ERROR!! 2`);
            }
            db.query('SELECT * FROM author',function(err2,authors){
                var list = template.list(topics);
                var html = template.HTML(
                topic[0].title,
                `
                <form action="/update_process" method="POST">
                    <input type="hidden" name="id" value="${topic[0].id}" /> 
                    <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"/></p>
                    <p><textarea name="desc01" id="" cols="30" rows="10" placeholder="description">${topic[0].description}</textarea></p>
                    <p>
                        ${template.authorSelect(authors, topic[0].author_id)}
                    </p>
                    <p>
                    <input type="submit" />
                    </p>
                </form>
                `,
                `<a href="/create" title="create">create</a> 
                <a href="/update?id=${topic[0].id}" title="update">update</a>`,
                list
                );
                response.writeHead(200);
                response.end(html);
            });      
        });
    });
}

exports.update_process = function(request, response){
    var body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
        db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?', [post.title, post.desc01,post.author, post.id], function(error, result){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
    });
}

exports.delete = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query('DELETE FROM topic WHERE id = ?', [post.id], function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/`});
            response.end();
          });
      });
} 

exports.login = function(request, response){
    db.query(`select * from topic`, function(err, topics) {
        if (err) {
          console.log(`Error!!`);
        }
        // console.log(topics);
        var title = "Login";
        var list = template.list(topics);
        var html = template.HTML(
          title,
          `<h2>${sanitizeHtml(title)}</h2>`,
          `<form action="/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"/></p>
            <p><input type="password" name="password" placeholder="password"/></p>
            <input type="submit" placeholder="email"/>
          </form>
          `,
          `<a href="/create" title="create">create</a>`,
          list
        );
        response.writeHead(200);
        response.end(html);
    });
}


exports.login_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query('SELECT * FROM user_info', function(error, result){
            var inst_id = post.email;
            var inst_pass = post.password;
            for(var i = 0; i < result.length;i++){
                if(result[i].id_info === inst_id && result[i].password === inst_pass){
                    console.log(`hello ${inst_id}!`);
                }else{
                    console.log(`Try again`);
                }
            }
            response.writeHead(302, {
                'SET-Cookie':[
                    `email=${inst_id}`,
                    `password=${inst_pass}`
                ],
                Location:`/`
            });
            response.end();
          });
      });
}
