const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const port = 3000;
const pageRouter = require('./routes/page.js');
const indexRouter = require('./routes/index.js');
const helmet = require('helmet');

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