var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageModel = new Schema({
    place: String,
    location: String,
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    status: String,
    message: String
});

var Message = mongoose.model('Message', MessageModel);

module.exports = Message;