var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({
	email: String,
	content: String,
	created: { type: Date, default: Date.now }
});

var Message = mongoose.model('message', messageSchema);
module.exports = Message;