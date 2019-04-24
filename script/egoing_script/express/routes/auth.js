const express = require('express')
const router = express.Router();
const template = require('../lib/template.js');

const authDate = {
    email: `siri`,
    password: `1111`,
    nike: `rang`
}

router.get('/login',function(req,res){
    var title = 'WEB - Login';
    var list = template.list(req.list);
    var html = template.HTML(title, list, `
        <form action="/auth/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="pwd" placeholder="password"></p>
            <p>
                <input type="submit" value="login">
            </p>
        </form>
    `, '');
    res.send(html);
});

router.post('/login_process',function(req, res){
        var post = req.body;
        var email = post.email;
        var password = post.pwd;
        if(email === authDate.email && password === authDate.password){
            req.session.is_logined = true;
            req.session.nike = authDate.nike;
            res.redirect(`/`);
        }else{
            res.send(`who?`);
        }
});

router.get('/logout',function(req,res){
   req.session.destroy(function(err){
        res.redirect(`/`);
   });
});

module.exports = router;