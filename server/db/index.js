const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//::TODO setup for dev and prod
const env = 'dev';


const promise = mongoose.connect('mongodb://nquinn721:nate123@ds031632.mlab.com:31632/dlove' + env, {
  useMongoClient: true,
}); 
promise.then(function(db) {
    // console.log('Connected DB');
});

global.User = require('./User');
global.Dates = require('./Date');
global.Messages = require('./Message');
global.Image = require('./Image');

module.exports = promise;