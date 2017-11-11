var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {
    	type: Date,
    	default: Date.now()
    }
});

var ChatModel = mongoose.model('Chat', ChatSchema);

class Chat{
	createChat(to, from, cb) => {
		ChatModel.create({to, from}, cb);
	}
}

module.exports = Chat;