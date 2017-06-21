var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	username: String,
	pwd:String
});

module.exports = UserSchema;
