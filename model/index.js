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
//msg schema 
//var MsgSchema = mongoose.Schema({
//	message: { type: String },
//	sentFrom: { type: String },
//	sentTo: { type: String },
//	sentAt: { type: String }
//})
module.exports = mongoose.model('Users', UserSchema);
//module.exports = mongoose.model('Msgs',MsgSchema);


