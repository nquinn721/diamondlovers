const express = require('express');
const router = express.Router();
const Image = require('../lib/image');
const formidable = require("express-formidable");
const bodyParser = require('body-parser');



// Don't use parsing middleware since we are using multer
router.post('/profile-image-upload', (req, res) => {
     Image.storage(req, res, () => {
        if(req.error){
            res.send(req.error);
        }else{
            res.send({msg: 'success', user: req.session.user});
        }
     });
});


router.use(bodyParser.urlencoded({ extended: false }));
router.use(formidable());
router.use(function(req, res, next){
    req.body = Object.keys(req.fields).length ? req.fields : req.body;
    next();
});

router.get('/delete-all-images', (req, res) => {
    if(req.session.user.admin)
        Image.deleteAllImages();
    res.redirect('/');
});
router.post('/make-image-default', (req, res) => {
    let image = req.body.image;
    User.setDefaultImage(req.session.user.client.email, image, (e, user) => {
        console.log(user);
        req.session.user.client = user;
        res.send(user);
    });
});


module.exports = router;