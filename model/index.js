var mongoose = require('mongoose');
// User Schema
var UserSchema = mongoose.Schema({
	name: { type: String },
	password: { type: String },
	email: { type: String },
});
module.exports = mongoose.model('Users', UserSchema);


