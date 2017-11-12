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
	static createChat(to, from, cb){
		ChatModel.create({to, from}, cb);
	}
	static get(userId, ids, cb){
		ChatModel.find({_id: {$in: ids}})
			.populate({
				path: 'to',
				// select: 'profile.displayName profile.defaultImage',
				model: 'User',
				// populate: {
				// 	path: 'profile.defaultImage',
				// 	model: 'Image'
				// }
			})
			.populate({
				path: 'from',
				// select: 'profile.displayName profile.defaultImage',
				model: 'User',
				// populate: {
				// 	path: 'profile.defaultImage',
				// 	model: 'Image'
				// }
			})
			.exec(cb);
	}
}

module.exports = Chat;