var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageModel = new Schema({
    chat: {type: Schema.Types.ObjectId, ref: 'Chat'},
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    message: String
});

var Message = mongoose.model('Message', MessageModel);

module.exports = Message;