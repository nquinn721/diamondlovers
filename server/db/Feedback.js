var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Feedback = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    status: String,
    message: String
});

module.exports = Feedback;