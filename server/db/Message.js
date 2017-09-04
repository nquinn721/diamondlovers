var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageModel = new Schema({
    chat: {type: Schema.Types.ObjectId, ref: 'Chat'},
    message: String
});

var Message = mongoose.model('Message', MessageModel);

module.exports = Message;