var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'duemkn2nj', 
  api_key: '568768714353137', 
  api_secret: 'uLeUIKycXGk4_kMaw9WalaDpM1Y' 
});


module.exports = {
	upload: function(url, email, cb = function(){}) {
		console.log('upload', url, email);
		cloudinary.v2.uploader.upload(url, {folder: 'dlovedev/' + email}, cb);
	},
	delete: function(id, cb = function(){}) {
		cloudinary.v2.uploader.destroy(id, {invalidate: true }, cb);
	}
}