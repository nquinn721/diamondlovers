const express = require('express');
const router = express.Router();
const path = require('path');
const mkdirp = require('mkdirp');
const multer = require('multer');
const config = require('../config');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log(req.session.user.email);
            // Create user directory
            mkdirp(`server/images/${req.session.user.email}/profile`, () => cb(null, `server/images/${req.session.user.email}/profile`));
            
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});

// router.post('/user', (req, res) => {
//     res.send({user: req.session.user});
// });

router.post('/profile-image-upload', upload.single('profile'), (req, res) => {
    console.log(req.body);
});


module.exports = router;