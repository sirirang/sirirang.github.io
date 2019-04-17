var db = require("./db_info");
var template = require("./template.js");
var qs = require("querystring");

exports.home = function(request,response){
    db.query(`select * from topic`, function(err, topics) {
        if (err) {
          console.log(`Error!!`);
        }
        db.query(`SELECT * FROM author`,function(err2,authors){
            var title = "Authors";
            var list = template.list(topics);
            var author_list = template.authorlist(authors);
            var html = template.HTML(
            title,
            `<h2>${title}</h2>
            ${author_list}
            <form action="/authors/creat_process" method="post">
                <p>
                    <input type="text" name="name" placeholder="name"/>
                </p>
                <p>
                    <textarea name="profile" id="" cols="30" rows="10" placeholder="profile"></textarea>
                </p>
                <p>
                  <input type="submit" />
                </p>
            </form>
            `,
            ``,
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
        `INSERT INTO author(name, profile) VALUES(?,?)`,
        [post.name, post.profile],
        function(err, result) {
          if (err) {
            console.log(`ERROR!!!`);
          }
          response.writeHead(302, { location: `/authors` });
          response.end();
        }
      );
    });
}

exports.update = function(request,response,queryData){
    db.query(`select * from topic`, function(err, topics) {
        if (err) {
          console.log(`Error!!`);
        }
        db.query(`SELECT * FROM author`,function(err2,authors){
            db.query(`SELECT * FROM author WHERE id =?`,[queryData.id],function(err3,author){
                var title = "Authors";
                var list = template.list(topics);
                var author_list = template.authorlist(authors);
                var html = template.HTML(
                title,
                `<h2>${title}</h2>
                ${author_list}
                <form action="/authors/update_process" method="post">
                    <p>
                        <input type="hidden" name="id" value="${queryData.id}"/>
                    </p>
                    <p>
                        <input type="text" name="name" value="${author[0].name}" placeholder="name"/>
                    </p>
                    <p>
                        <textarea name="profile" id="" cols="30" rows="10" placeholder="profile">${author[0].profile}</textarea>
                    </p>
                    <p>
                      <input type="submit" />
                    </p>
                </form>
                `,
                ``,
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
        db.query('UPDATE author SET name=?, profile=? WHERE id=?', [post.name, post.profile, post.id], function(error, result){
            response.writeHead(302, {Location: `/authors`});
            response.end();
        });
    });
}

exports.delete = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          //하단에 db쿼리 삭제시 작성자를 삭제해도 해당 게시글은 남아있게 할 수 있음
          db.query(`DELETE FROM topic WHERE id =?`,[post.id],function(err,result){
            db.query('DELETE FROM author WHERE id = ?', [post.id], function(err2, result){
                if(err2){
                  throw err2;
                }
                response.writeHead(302, {Location: `/authors`});
                response.end();
              });
          });
          
      });
} 