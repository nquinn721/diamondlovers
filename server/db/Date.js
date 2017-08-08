var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatesModel = new Schema({
    place: String,
    location: String,
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date},
    status: String,
    fromShowed: Boolean,
    toShowed: Boolean,
    fromRating: Number,
    toRating: Number
});

var Dates = mongoose.model('Dates', DatesModel);

module.exports = Dates;