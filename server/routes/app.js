const express = require('express');
const router = express.Router();
const path = require('path');
const mkdirp = require('mkdirp');
const multer = require('multer');
const config = require('../config');
const Image = require('../lib/image');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            mkdirp(imageLocation(req.session.user.email), () => cb(null, imageLocation(req.session.user.email)));
            
        },
        filename: (req, file, cb) => {
            file.location = imageLocation(req.session.user.email);
            Image.upload(req.session.user.email, file);
            cb(null, file.originalname);
        }
    })
});

function imageLocation(email){
    return `server/images/${email}/profile`;
}

// router.post('/user', (req, res) => {
//     res.send({user: req.session.user});
// });

router.post('/profile-image-upload', upload.single('image'), (req, res) => {
    console.log(req.body);
});


module.exports = router;