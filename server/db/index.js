var mongoose = require('mongoose');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds113670.mlab.com:13670/heroku_38bkxwbj');

global.User = require('./User');
global.Dates = require('./Date');
global.Messages = require('./Message');