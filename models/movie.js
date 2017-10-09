var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/imooc');
mongoose.connection.on('error', function(error){
  console.log('数据库imooc连接失败：' + error)
  return
});
mongoose.connection.once('open', function(){
  console.log('数据库imooc连接成功')
  // callback()
});

var movieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		},
	}

});

//每次调用save方法时都会执行一次 判断保存的数据是新数据还是 旧数据
movieSchema.pre('save',function(next,done){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});


//查询所有的电影列表

movieSchema.statics.getMovieList = function(cb){
	return this.find({})
			.exec(cb)
		
}
/*movieSchema.statics.getMovieList = function(cb){
	this.find({},cb);		
}*/
//查询单条数据
movieSchema.statics.findByID = function(id,cb){
	return this.findOne({_id:id})
			.exec(cb)
	/*this.findOne({username:username,pass:pass},callback)*/ 
}

//添加
movieSchema.statics.addList = function(movie,callback){
	this.create(movie,callback)
}



module.exports = mongoose.model('Movie', movieSchema)