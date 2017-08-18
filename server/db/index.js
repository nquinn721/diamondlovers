var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://nate:nate123@ds141088.mlab.com:41088/heroku_rdzrr701', {
  useMongoClient: true,
});
promise.then(function(db) {
    // console.log('Connected DB');
});

global.User = require('./User');
global.Dates = require('./Date');
global.Messages = require('./Message');

module.exports = promise;