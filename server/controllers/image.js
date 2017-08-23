const Image = require('../lib/image');
const Cloud = require('../lib/cloudinary');

module.exports = {
    profileImageUpload: (req, res) => {
         Image.storage(req, res, updateClient.bind(this, req, res));
    },
    makeImageDefault: (req, res) => {
        User.setDefaultImage(req.session.user.client.email, req.body, updateClient.bind(this, req, res));
    },

    deleteImage: (req, res) => {
        Cloud.delete(req.body.public_id, (e, file) => {
            if(!e || file.result !== 'not found')User.deleteImage(req.session.user.client.email, req.body, updateClient.bind(this, req, res));
            else res.send({error: 'file not found'});
        });
    }


}

function updateClient(req, res, e, user) {
    if(e)return res.send(e);
    req.session.user.client = user.client();
    res.send(req.session.user);
}