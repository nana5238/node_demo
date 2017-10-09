var express = require('express');
var router = express.Router();

var multer  = require('multer');



var MovieModel = require('../models/movie.js');


//电影列表渲染
router.get('/',function(req,res){
	MovieModel.getMovieList(function(err,list){
		if(err){
			console.log(err);
		}
		res.render('pages/index',{title:'首页列表',movies:list})
	})
	
});


//电影详情页面渲染
router.get('/detail/:id',function(req,res){
	var id = req.params.id;
	MovieModel.findByID(id,function(err,movie){
		res.render('pages/detail',{
			title:'详情页',
			movie:movie,
		})
	})
});

//后台录入页渲染
router.get('/admin',function(req,res){
	var _movie = {
			doctor:'',
			title:'',
			language:'',
			country:'',
			summary:'',
			flash:'',
			poster:'',
			year:'',
	};
	res.render('pages/admin',{title:'后台录入',movie:_movie})
});


//后台更新某一条列表路由
router.get('/admin/updata/:id',function(req,res){
	var id = req.params.id;
	if(id){
		MovieModel.findByID(id,function(err,movie){
			res.render('pages/admin',{title:'后台更新页',movie:movie});
		})	
	}
})


//后台表单提交数据
router.post('/admin/movie/post',function(req,res){
	var id = req.body._id; 
	var _movie = {
			doctor:req.body.doctor,
			title:req.body.title,
			language:req.body.language,
			country:req.body.country,
			summary:req.body.summary,
			flash:req.body.flash,
			poster:req.body.poster,
			year:req.body.year,
	};

	//id 不等于 undefined.说明这部电影已经存在；通过id,去查movie对象
	if(id !== "undefined"){
		MovieModel.update({_id: id}, _movie, function(error, data){
			res.redirect('/detail/'+ id);
		});

	}else{
		MovieModel.addList(_movie,function(err,movie){
			if(err){
				console.log(err);
				return;
			}
			res.redirect('/detail/'+movie._id);
		})
	}

})

//后台获取列表页
router.get('/admin/list',function(req,res){
	MovieModel.getMovieList(function(err,list){
		if(err){
			console.log(err);
		}
		res.render('pages/list',{title:'后台列表',movies:list})
	})

});

//后台删除某一条列表数据
router.delete('/admin/delete',function(req,res){
	var id  = req.query.id;
	if(id){
		MovieModel.remove({_id:id},function(err,movie){
			
			if(err){
				console.log(err)
			}else{
				res.json({'success':1});
			}

		})
	}
});

//图片上传路由
/*router.post('/upload',multipartMiddleware, function(req, resp) {
  console.log(req.body, req.files);

});*/
// router.post('/upload',function(req, res, next) {
// 	var form = new multiparty.Form({uploadDir: '../public/images/'});
	
//  	form.parse(req, function(err, fields, files){
//  		console.log(fields);
//  		console.log(files);
        


//     });
// });
var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, path.join(__dirname,"../images"));  
  },  
  filename: function (req, file, cb) {  
    var date = new Date();  
    cb(null, "("+moment().format("YYYY-MM-DD")+")"+file.originalname);  
  }  
});  

var upload = multer({ storage: storage });
router.post('/upload', upload.single('avatar'), function (req, res, next) {  
    res.send('upload success')  
    console.log(req.file);  
    console.log(req.body);  
});

module.exports = router;