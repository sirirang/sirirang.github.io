const express = require('express')
const router = express.Router();
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template.js');
const fs = require('fs');

router.get('/:pageId', function (req, res) {
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = req.params.pageId;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
            });
            var list = template.list(req.list);
            var html = template.HTML(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            ` <a href="/create">create</a>
                <a href="/update/${sanitizedTitle}">update</a>
                <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
                </form>`
            );
        res.send(html);
    });
})

router.get('/create',function(req,res){
    var title = 'WEB - create';
    var list = template.list(req.list);
    var html = template.HTML(title, list, `
        <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `);
    res.send(html);
});

router.post('/create_process',function(req,res){
    // var body = '';
    //     req.on('data', function(data){
    //     body = body + data;
    //   });
    //   req.on('end', function(){
    //       var post = qs.parse(body);
    //       var title = post.title;
    //       var description = post.description;
    //       fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    //         res.redirect(`/page/${title}`);
    //       })
    //   });

    //post는 form에서 있는 input 의 name 을 객체로 받는다
    var post = req.body;
    console.log(post);
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        res.redirect(`/page/${title}`);
    });
});

router.get('/:updateId', function(req, res){
    var filteredId = path.parse(req.params.updateId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = req.params.updateId;
        var list = template.list(req.list);
        var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
            <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
            <input type="submit">
            </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update/${title}">update</a>`
        );
        res.send(html);
    });
});

router.post('/update_process',function(req, res){
        var post = req.body;
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            res.redirect(`/page/${title}`);
          })
        });
});

router.post('/delete_process',function(req,res){
    var post = req.body;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error){
    res.redirect('/');
    })
});

module.exports = router;