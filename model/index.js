var mongoose = require('mongoose');


// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	
});

var User = module.exports = mongoose.model('Users', UserSchema);


