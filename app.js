var express  = require("express"); //导入express库
var bodyParser = require("body-parser"); //导入处理post请求的中间件

var mongoose = require("mongoose"); //导入联系mongodb的第三方库

var app = express(); //创建exress的实例

//User

var User = require('./model/user');

mongoose.connect('mongodb://127.0.0.1:27017/1702mongo'); //mongodb:// 表示链接mongodb的协议
//紧跟着是链接的域名加端口，再接着就是 数据库的名称

//使用这个中间件 放置到 自定义处理函数的前面
var db = mongoose.connection; //返回当前的链接数据对象


db.on('open', function() {
   console.log("数据库链接成功！")
});

app.use(bodyParser.json()) //use专门使用中间件的方法
app.use(bodyParser.urlencoded({ //使用url编码来处理form表单提交的post请求
   extended: true
}))


// 指定静态资源的目录

app.use(express.static('pages'));
app.use(express.static('static'));

app.get('/',function(req,res){ //创建一个路由，处理 "/" 路径的前端请求 
    res.send("最好不要迟到！"); //发送一段字符到前端
})

app.post('/login',function(req,res){ //处理登陆的post请求
   // console.log(req.body); 拿到数据后，做自己的操作了 
    //查询是否存在这个人

    User.find({"username":req.body.username},function(err,doc){
        if (err) {
        	res.json({code:1,msg:"登陆失败"});
        };

        //console.log(doc)
        if (doc.length == 1) {
            res.json({code:0,msg:"登陆成功"});   
        }else{
        	res.json({code:1,msg:"用户不存在"}); 
        };

    })

  //给前端相应一个json对象回去
})


app.post('/register',function(req,res){ //处理登陆的post请求
  
   // 做数据库的操作了
    var user = req.body;
    
    //数据的存储
   
    var u = new User({ //new 一个 user的实例出来
    	username:user.username,
    	pwd:user.pwd
    });
    //防止重复 ，保存之前要查询一次

    u.save(function(err,doc){ //使用实例 u 的save方法 来执行数据的保存
    	
    	if (err) {
    		res.json({code:1,msg:"保存失败！"});
    		return
    	};

       res.json({code:0,msg:"保存成功"}); //给前端相应一个json对象回去
    })


   
})


app.listen(8090,function(){
	console.log("连接成功！")
}); //设置监听的端口