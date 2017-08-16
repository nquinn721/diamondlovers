const express = require('express');
const router = express.Router();
const Image = require('../lib/image');
const formidable = require("express-formidable");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(formidable());
router.use(function(req, res, next){
    req.body = req.fields && Object.keys(req.fields).length ? req.fields : req.body;
    next();
});




router.post('/profile-image-upload', (req, res) => {
    console.log(req.body);
    //  Image.storage(req, res, () => {
    //     if(req.error){
    //         res.send(req.error);
    //     }else{
    //         res.send({msg: 'success', user: req.session.user});
    //     }
    //  });
});

router.get('/delete-all-images', (req, res) => {
    if(req.session.user.admin)
        Image.deleteAllImages();
    res.redirect('/');
});
router.post('/make-image-default', (req, res) => {
    let image = req.body.image;
    User.setDefaultImage(image, (e, user) => {
        console.log(user);
    });
});


module.exports = router;