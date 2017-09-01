
module.exports = {
    profileImageUpload: (req, res) => {
        Image.addImage(req.session.user.client._id, req, res, (e, image) => {
            if(image)
                req.session.user.images.push(image);

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
        User.setDefaultImage(req.session.user.client._id, req.body.image, updateClient.bind(this, req, res));
    },

    deleteImage: (req, res) => {
        Image.delete(req.session.user.client._id, req.body.public_id, (e, images) => {
            if(e)return res.send({error: 'failed'});
            req.session.user.images = images;
            res.send({data: req.session.user.images});
        });
    }


}

function updateClient(req, res, e, images, doc) {
    if(e)return res.send({error: 'failed'});
    req.session.user.images = images;
    res.send({data: req.session.user.images});
}