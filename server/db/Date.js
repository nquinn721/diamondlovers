var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatesSchema = new Schema({
    location: String,
    time: Date,
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    approvedAt: Date,
    completedAt: Date,
    status: {
        type: String,
        enum: ['pending', 'approved', 'completed'],
        default: 'pending'
    },
    fromShowed: Boolean,
    toShowed: Boolean
});

var DatesModel = mongoose.model('Dates', DatesSchema);

class Dates{
    getDates(_id, cb = function(){}){
        DatesModel.find({ $or: [{'to': _id}, {'from': _id}]});
    }
    setDate(to, from, location, time, cb = function(){}){
        DatesModel.create({to, from, location, time}, cb);
    }
}
module.exports = Dates;