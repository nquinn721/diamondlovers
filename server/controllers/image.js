
module.exports = {
    profileImageUpload: (req, res) => {
        Image.addImage(req.session.user.client._id, req, res, (e, image) => {
            if(image){
                if(req.session.user.images)
                    req.session.user.images.push(image);
                else req.session.user.images = [image];
            }

            if(req.body.defaultImage)
                return User.setDefaultImage(req.session.user.client._id, image, (e, user, doc) => {
                    req.session.user.client = user;
                    req.session.model = doc;
                    res.send(e ? {error: 'failed'} : {data: {client: user, images: req.session.user.images}});
                });
            res.send(e ? {error: 'failed'} : {data: req.session.user.images});
        });
    },
    setDefaultImage: (req, res) => {
        User.setDefaultImage(req.session.user.client._id, req.body.image, (e, user, model) => {
            req.session.user.client = user;
            req.session.model = model;
            res.send({data: req.session.user.client});
        });
    },

    deleteImage: (req, res) => {
        Image.delete(req.session.user.client._id, req.body.public_id, (e, images) => {
            if(e)return res.send({error: 'failed'});
            req.session.user.images = images;
            res.send({data: {client: req.session.user.client, images: req.session.user.images}});
        });
    }


}

