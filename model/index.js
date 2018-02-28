var mongoose = require('mongoose');
// User Schema
var UserSchema = mongoose.Schema({
	name: { type: String },
	password: { type: String },
	email: { type: String },
	contact:{type:Array}
});
module.exports = mongoose.model('Users', UserSchema);


