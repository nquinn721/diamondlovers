const express = require('express');
const router = express.Router();
const Image = require('../lib/image');




router.post('/profile-image-upload', (req, res) => {
     Image.storage(req, res, () => {
        if(req.error){
            res.send(req.error);
        }else{
            res.send({msg: 'success', user: req.session.user});
        }
     });
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