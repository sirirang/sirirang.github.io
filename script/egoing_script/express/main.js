const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const port = 3000;
const pageRouter = require('./routes/page.js');
const authRouter = require('./routes/auth.js');
const indexRouter = require('./routes/index.js');
const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
    secret: '1231231awe!@#QSDSA!@A',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
  }))
app.use(helmet());
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(req,res,next){
    fs.readdir('./data', function(error, filelist){
        req.list = filelist;
        next(); 
    });
});

app.use('/', indexRouter);
app.use('/page', pageRouter);
app.use('/auth', authRouter);

app.use(function(req,res,next){
    res.status(404).send(`Sorry!`);
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.listen(port,function(){
    console.log(`http://localhost:${port}  <- click here with ctrl`);
});