const Image = require('../lib/image');
module.exports = {
	deleteAllImages: (req, res) => {
	    Image.deleteAllImages();
	    res.send('ok');
	}
}