
# node_demo
电影列表、详情展示以及后台录入、修改删除功能
*  安装MongoDB和node

*  项目快速搭建
 >  express 项目名;

* 项目启动
1.  需要启动mongodb数据库服务  例：C:\MongoDB\Server\3.4\bin\mongod.exe
2.  启动node服务，在项目目录下运行 node app


* app.js配置文件
- 模板引擎配置 ，使用 ejs-mate

```javascript
var engine = require('ejs-mate');
app.engine('html',engine);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html'); 
```

* models movie.js //配置数据库的连接

* public //静态文件

*  routes //路由 包括页面渲染以及一些方法
> 地址参数取值  
1. get获取id参数是  /detail/:id   var id = req.params.id;
2. form表单post提交数据获取 req.body.name属性
3. data-id 属性取值  req.query.id


* views //页面
> layout.html 布局文件
> <div class="header"><%- partial('header')%></div>  公共部分插入到布局文件中
> <div class="main"><%- body%></div>
> pages里的页面以body的形式全部插入到layout的布局文件中；<%- layout('layout')%>
