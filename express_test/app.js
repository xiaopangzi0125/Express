var express = require("express");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var app = express();
var User = require("./model/user");

mongoose.connect("mongodb://127.0.0.1:27017/1702demo");

var db = mongoose.connection;
db.on("open",function(){
	console.log("数据库连接成功")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(express.static("pages"));
app.use(express.static("static"));

app.get("/",function(req,res){
	res.send("hello pz");
});

app.post("/login",function(req,res){
	User.find({"name":req.body.username},function(err,doc){
		if(err){
			res.json({code:1,msg:"登录失败"});
		};
		
		if(doc.length === 1){
			res.json({code:0,msg:"登录成功"});
		}else{
			res.json({code:1,msg:"用户不存在"});
		}
	})
})

app.post("/register",function(req,res){
	var user = req.body;
	var u = new User({
		username:user.username,
		pwd:user.pwd
	});
	
	u.save(function(err,doc){
		if(err){
			res.json({code:1,msg:"用户保存失败"});
			return;
		}
		
		res.json({code:0,meg:"注册成功"});
	})
	
	
})

app.listen(8090,function(){
	console.log("连接成功");
})























