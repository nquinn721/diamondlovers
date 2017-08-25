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
    },
    loadUser: (req, res) => {
    	User.get(req.params.email, (e, doc) => res.send(e || doc));
    },
    updateUser: (req, res) => {
		User.updateProfile(req.body.email, req.body.field, req.body.value, (e, doc) => {
			if(e)return res.send({error: `failed to update[${req.body.field}]`});
			req.session.user.client = doc;
			res.send(doc.client());
		})
	},
	uploadImageForUser: (req, res) => {
        Image.storage(req.params.email, req, res, (e, doc) => res.send(e || doc));
	}
}