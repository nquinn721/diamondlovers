var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Profile = new Schema({
    about: String,
    income: String,
    cost: {
        date1: Number,
        date2: Number,
        date3: Number
    },
    preferences: {
        race: String,
        distance: Number
    },
    images: [String]
});

var UserModel = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    profile: [Profile],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date}
});

var User = mongoose.model('User', UserModel);

module.exports = User;