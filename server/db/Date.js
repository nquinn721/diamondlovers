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
    agreedAt: Date,
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
        DatesModel.find({ $or: [{'to': _id}, {'from': _id}]}, cb);
    }
    setDate(to, from, location, time, cb = function(){}){
        DatesModel.create({to, from, location, time}, cb);
    }

    agreeToDate(_id, cb = function(){}){
        DatesModel.findOneAndUpdate({_id}, {agreedAt: Date.now()}, {new: true}, cb);
    }
    confirmShowed(_id, userId, cb = function(){}){
        DatesModel.findOne({_id}, (e, doc) => {
            if(e)return cb(e);
            if(doc.to.toSting() === userId){
                doc.fromShowed = true;
            }else if(doc.from.toSting() === userId){
                doc.toShowed = true;
            }

            if(doc.fromShowed && doc.toShowed){
                doc.completedAt = Date.now();
            }
            doc.save(cb);
        });
    }
}
module.exports = Dates;