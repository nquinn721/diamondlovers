const cloudinary = require('cloudinary');
const config = require('../config');


cloudinary.config(config.cloudinary);


module.exports = {
	upload: function(url, userId, cb = function(){}) {
		cloudinary.v2.uploader.upload(url, {folder: 'dlovedev/' + userId}, cb);
	},
	delete: function(id, cb = function(){}) {
		cloudinary.v2.uploader.destroy(id, {invalidate: true }, cb);
	}
}