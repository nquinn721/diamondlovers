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
			.populate('to',  { 
				path : 'to',
				match: {_id : { $ne: userId}},
				select:'profile.displayName profile.defaultImage',
              	model: 'User'
            })
			.populate('from', { 
				path : 'from',
				match: {_id : { $ne: userId}},
				select:'profile.displayName profile.defaultImage',
              	model: 'User'
            })
			.exec(cb);
	}
}

module.exports = Chat;