const Image = require('../lib/image');

module.exports = {
    profileImageUpload: (req, res) => {
         Image.storage(req, res, () => {
            if(req.error){
                res.send(req.error);
            }else{
                res.send(req.session.user);
            }
         });
    },
    makeImageDefault: (req, res) => {
        User.setDefaultImage(req.session.user.client.email, req.body, updateClient.bind(this, req, res));
    },

    deleteImage: (req, res) => {
        Image.deleteImage(req.session.user.client.email, req.body, updateClient.bind(this, req, res));
    },



}

function updateClient(req, res, e, user) {
    if(e)return res.send(e);
    req.session.user.client.profile = user.profile;
    res.send(req.session.user);
}