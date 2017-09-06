module.exports = {
	deleteAllImages: (req, res) => {
	    Image.deleteAllImages();
	    res.send('ok');
	},
	getFullUser: (req, res) => {
		res.send(req.session.model);
	},
	getAllUsers: (req, res) => {
		User.getAllUsers((e, doc) => res.send(e ? {error: e} : {data: doc}));
	},
	seed: (req, res) => {
		User.seed((e, doc) => res.send(e ? {error: e} : {data: doc}));
	},
    clearDBImages: (req, res) => {
        User.deleteAllImages(res.send);
    },
    updateModel: (req, res) => {
    	User.updateModel(req.session.model._id, req.body.field, req.body.value, (e, user, doc) => {
    		req.session.model = doc;
    		res.send({data: doc});
    	})
    },
    updateUser: (req, res) => {
    	User.update(req.body, (e, user, doc) => {
    		res.send(e ? {error: e} : {data: doc});
    	})
    },
    updateUserProfile: (req, res) => {
		User.updateProfile(req.body._id, req.body.field, req.body.value, (e, user, doc) => {
			if(e)return res.send({error: `failed to update[${req.body.field}]`});
			req.session.user.client = doc;
			res.send({data: doc.client()});
		})
	},
	getImagesForUser: (req, res) => {
		Image.basic(req.params.id, (e, images) => {
			if(e)return res.send({error: e});
			res.send({data: images});
		});
	},
	uploadImageForUser: (req, res) => {
        Image.addImage(req.params.id, req, res, (e, doc) => {
        	Image.basic(req.params.id, (e, images) => {
        		if(e)return res.send({error: e});
    			

        		if(images.length === 1)
	                return User.setDefaultImage(req.params.id, images[0], (e, user, doc) => {
	        			if(e)return res.send({error: e});
		    			user.images = images;
	                    res.send({data: user});
	                });
        		User.find(req.params.id, (e, user) => {
        			if(e)return res.send({error: e});
	    			user.images = images;
		        	res.send({data: user});
        		})
        	})
        });
	},
	deleteImageForUser: (req, res) => {
		Image.delete(req.params.id, req.body.public_id, (e, images) => {
            if(e)return res.send({error: 'failed'});
            User.find(req.params.id, (e, user) => {
            	let defaultImage = user.profile.defaultImage && images.filter(img => {img._id.toString() === user.profile.defaultImage.toString()})[0];
	            if(!defaultImage)
	                return User.setDefaultImage(user._id, images[0], (e, user, model) => {
	                	user.images = images;
                		res.send({data: user});
	                });
            	user.images = images;
        		res.send({data: user});
            });
        });
	}
}