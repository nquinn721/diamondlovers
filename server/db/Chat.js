var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatModel = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    message: String
});

var Chat = mongoose.model('Chat', ChatModel);

module.exports = Chat;