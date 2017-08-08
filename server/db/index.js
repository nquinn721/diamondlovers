var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://nate:nate123@ds113670.mlab.com:13670/heroku_38bkxwbj', {
  useMongoClient: true,
});
promise.then(function(db) {
    console.log('Connected DB');
});

global.User = require('./User');
global.Dates = require('./Date');
global.Messages = require('./Message');

module.exports = {};