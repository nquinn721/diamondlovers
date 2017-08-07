var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Profile = new Schema({
    about: String,
    income: String,
    preferences: {
        race: String,
        distance: Number
    },
    images: [String]
});

var User = new Schema({
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

module.exports = User;