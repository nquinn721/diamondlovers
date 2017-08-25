module.exports = {
	deleteAllImages: (req, res) => {
	    Image.deleteAllImages();
	    res.send('ok');
	},
	getAllUsers: (req, res) => {
		User.getAllUsers((e, doc) => res.send(e ? {error: e} : doc));
	},
	seed: (req, res) => {
		User.seed((e, doc) => res.send(e ? {error: e} : doc));
	},
    clearDBImages: (req, res) => {
        User.deleteAllImages(res.send);
    },
    updateUser: (req, res) => {
		User.updateProfile(req.body._id, req.body.field, req.body.value, (e, doc) => {
			if(e)return res.send({error: `failed to update[${req.body.field}]`});
			req.session.user.client = doc;
			res.send(doc.client());
		})
	},
	getImagesForUser: (req, res) => {
		Image.basic(req.params.id, (e, images) => {
			if(e)return res.send({error: e});
			res.send(images);
		});
	},
	uploadImageForUser: (req, res) => {
        Image.addImage(req.params.id, req, res, (e, doc) => {
        	Image.basic(req.params.id, (e, images) => {
        		if(e)return res.send({error: e});
        		User.find(req.params.id, (e, user) => {
        			if(e)return res.send({error: e});

			        	res.send({user: user, images: images});

        		})
        	})
        });
	}
}