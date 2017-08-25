
module.exports = {
    profileImageUpload: (req, res) => {
        Image.addImage(req.session.user.client._id, req, res, (e, image) => {
            if(image)
                req.session.user.images.push(image);

            if(req.body.defaultImage)
                return User.setDefaultImage(req.session.user.client._id, image, updateClient.bind(this, req, res));
            res.send(e ? {error: 'failed'} : req.session.user);
        });
    },
    makeImageDefault: (req, res) => {
        User.setDefaultImage(req.session.user.client._id, req.body, updateClient.bind(this, req, res));
    },

    deleteImage: (req, res) => {
        Image.delete(req.session.user.client._id, req.body.public_id, (e, images) => {
            if(e)return res.send({error: 'failed'});
            req.session.user.images = images;
            res.send(req.session.user);
        });
    }


}

function updateClient(req, res, e, user) {
    if(e)return res.send({error: 'failed'});
    req.session.user.client = user.client();
    res.send(req.session.user);
}