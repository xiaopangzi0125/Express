var mongoose = require("mongoose");
var UserSchema = require('../schema/user');

var User = mongoose.model('user',UserSchema)    // 第一个参数是集合名

module.exports = User; //创建好的一个用户集合的模型，这个模型就具有数据操作方法