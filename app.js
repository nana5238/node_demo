var express = require('express');
var engine = require('ejs-mate');
var path =require('path');
var bodyParser = require('body-parser');
var webRouter = require('./routes/web_routes.js');



var port = process.env.PORT || 4000;
var app = express();

//模板引擎
app.engine('html',engine);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');

//静态文件
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.moment = require('moment')
app.use('',webRouter);

app.listen(port);

console.log('服务成功开启' + port);

module.exports = app;