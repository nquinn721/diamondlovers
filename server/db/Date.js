var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatesSchema = new Schema({
    location: Object,
    time: Date,
    cost: Number,
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    chatId: {type: Schema.Types.ObjectId, ref: 'Chat'},
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
    static getDates(_id, cb = function(){}){
        DatesModel.find({ $or: [{'to': _id}, {'from': _id}]})
            .populate('to', 'id profile.displayName')
            .populate('from', 'id profile.displayName')
            .exec(cb);
    }
    static returnDoc(_id, cb = function(){}){
        DatesModel.findOne({_id})
            .populate('to', 'id profile.displayName')
            .populate('from', 'id profile.displayName')
            .exec(cb);
    }
    static setDate(to, from, location, time, cost, cb = function(){}){
        DatesModel.create({to, from, location, time, cost}, (e, doc) => {
            if(e)return cb(e);
            this.returnDoc(doc._id, cb);
        });
    }

    static approveDate(_id, cb = function(){}){
        DatesModel.findOneAndUpdate({_id}, {approvedAt: Date.now(), status: 'approved'}, {new: true}, (e, doc) => {
            if(e)return cb(e);
            this.returnDoc(doc._id, cb);
        });
    }
    static addChat(_id, chatId, cb = function() {}){
        DatesModel.findOneAndUpdate({_id}, {chatId}, {new: true}, (e, doc) => {
            if(e)return cb(e);
            this.returnDoc(doc._id, cb);
        });
    }

    static confirmShowed(_id, userId, cb = function(){}){
        DatesModel.findOne({_id}, (e, doc) => {
            if(e)return cb(e);
            if(doc.to.equals(userId)){
                doc.fromShowed = true;
            }else if(doc.from.equals(userId)){
                doc.toShowed = true;
            }

            if(doc.fromShowed && doc.toShowed){
                doc.completedAt = Date.now();
                doc.status = 'completed';
            }
            doc.save((e, doc) => {
                if(e)return cb(e);
                this.returnDoc(_id, cb);
            });
        });
    }
}
module.exports = Dates;