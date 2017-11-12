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
		MessageModel.find({chat})
			.populate({
				path: 'owner',
				select: 'profile.displayName profile.defaultImage',
				model: 'User',
				populate: {
					path: 'profile.defaultImage',
					model: 'Image'
				}
			})
			.exec(cb);
	}
}

module.exports = Message;