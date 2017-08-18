const express = require('express');
const router = express.Router();
const Image = require('../lib/image');
const formidable = require("express-formidable");
const bodyParser = require('body-parser');



// Don't use parsing middleware since we are using multer
router.post('/profile-image-upload', (req, res) => {
    console.log('uploading image');
     Image.storage(req, res, () => {
        console.log('error', req.error);
        if(req.error){
            res.send(req.error);
        }else{
            console.log('sending user');
            res.send(req.session.user);
        }
     });
});


router.use(bodyParser.urlencoded({ extended: false }));
router.use(formidable());
router.use(function(req, res, next){
    req.body = Object.keys(req.fields).length ? req.fields : req.body;
    next();
});


router.post('/make-image-default', (req, res) => {
    console.log(req.body);
    User.setDefaultImage(req.session.user.client.email, req.body, updateClient.bind(this, req, res));
});

router.post('/delete-image', (req, res) => {
    Image.deleteImage(req.session.user.client.email, req.body, updateClient.bind(this, req, res));
});

function updateClient(req, res, e, user) {
    if(e)return res.send(e);
    req.session.user.client.profile = user.profile;
    res.send(req.session.user);
}


module.exports = router;