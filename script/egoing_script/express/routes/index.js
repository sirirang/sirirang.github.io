const express = require('express')
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');

//app.get('/', (req, res) => res.send('Hello World!'));
//하단과 동일함 
//route 란 내가 원하는 path를 정하는거 pathname 하고 동일
router.get('/',function(req, res){
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}<br />
        <img src="/images/sleep.jpg" class="sleep" alt=""/>
        `,
        `<a href="/page/create">create</a>`,
        auth.authStatus(req,res)
    );
    res.send(html);
});


module.exports = router;