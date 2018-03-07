var mongoose = require('mongoose');
// User Schema
var UserSchema = mongoose.Schema({
	name: { type: String },
	password: { type: String },
	email: { type: String },
	contact: { type: Array },
	sentMsg: { type: Array },
	recievedMsg: { type: Array }
});
module.exports = mongoose.model('Users', UserSchema);



