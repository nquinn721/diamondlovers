const Image = require('../lib/image');
module.exports = {
	deleteAllImages: (req, res) => {
	    Image.deleteAllImages();
	    res.send('ok');
	},
	getAllUsers: (req, res) => {
		User.getAllUsers((e, doc) => res.send(e || doc));
	},
	seed: (req, res) => {
		User.seed((e, doc) => res.send(e || doc));
	},
    clearDBImages: (req, res) => {
        User.deleteAllImages(res.send);
    }
}