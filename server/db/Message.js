var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    chat: {type: Schema.Types.ObjectId, ref: 'Chat'},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    message: String
});

var MessageModel = mongoose.model('Message', MessageSchema);

class Message{
	static newMessage(chat, owner, message, cb) {
		MessageModel.create({chat, owner, message}, cb);
	}
	static getMessages(chat, cb){
		MessageModel.find({chat}, cb);
	}
}

module.exports = Message;