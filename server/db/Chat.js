var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    recentMsg: {
    	msg: String,
    	time: {
    		type: Date,
    		default: Date.now()
    	}
    },
    date: {
    	type: Date,
    	default: Date.now()
    }
});

var ChatModel = mongoose.model('Chat', ChatSchema);

class Chat{
	static createChat(to, from, cb = function(){}){
		ChatModel.create({to, from}, cb);
	}

	static recentMsg(_id, msg, cb = function(){}){
		ChatModel.findOneAndUpdate({_id}, {'recentMsg.msg': msg.split(' ').slice(0, 15).join(' '), 'recentMsg.time': Date.now()}, {new: true}, cb);
	}

	static closeChat(_id, cb = function(){}){
		ChatModel.find({_id}).remove().exec(cb);
	}
	static get(ids, cb = function(){}){
		ChatModel.find({_id: {$in: ids}})//, {sort: {date: -1}})
			.populate({
				path: 'to',
				select: 'profile.displayName profile.defaultImage',
				model: 'User',
				populate: {
					path: 'profile.defaultImage',
					model: 'Image'
				}
			})
			.populate({
				path: 'from',
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

module.exports = Chat;