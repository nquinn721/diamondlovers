
module.exports = {
    profileImageUpload: (req, res) => {
        Image.addImage(req.session.user.client._id, req, res, (e, image) => {
            if(image){
                if(req.session.user.images)
                    req.session.user.images.push(image);
                else req.session.user.images = [image];
            }

            if(req.body.defaultImage || req.session.user.images.length === 1)
                return User.setDefaultImage(req.session.user.client._id, image, (e, user, doc) => {
                    req.session.user.client = user;
                    req.session.model = doc;
                    res.send(e ? {error: 'failed'} : {data: {client: user, images: req.session.user.images}});
                });

            res.send(e ? {error: 'failed'} : {data: {client: req.session.user.client, images: req.session.user.images}});
        });
    },
    setDefaultImage: (req, res) => {
        User.setDefaultImage(req.session.user.client._id, req.body.image, (e, user, model) => {
            req.session.user.client = user;
            req.session.model = model;
            res.send({data: {client: req.session.user.client, images: req.session.user.images}});
        });
    },

    deleteImage: (req, res) => {
        let { client } = req.session.user,
            { _id } = client;

        Image.delete(_id, req.body.public_id, (e, images) => {
            if(e)return res.send({error: 'failed'});
            let defaultImage = images.filter(img => img._id.toString() === client.profile.defaultImage.toString());

            
            if(!defaultImage.length){
                User.setDefaultImage(_id, images[0], (e, user, model) => {
                    req.session.user.client = user;
                    req.session.user.images = images;
                    console.log(client, images);
                    res.send({data: {client, images}});
                });
                
            }else{
                res.send({data: {client, images}});
            }
        });
    }


}

