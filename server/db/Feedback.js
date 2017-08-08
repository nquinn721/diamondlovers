var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackModel = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    status: String,
    message: String
});

var Feedback = mongoose.model('Feedback', FeedbackModel);

module.exports = Feedback;