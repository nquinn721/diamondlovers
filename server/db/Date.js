var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Date = new Schema({
    place: String,
    location: String,
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    status: String,
    fromShowed: Boolean,
    toShowed: Boolean,
    fromRating: Number,
    toRating: Number
});

module.exports = Date;