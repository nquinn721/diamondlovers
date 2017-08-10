const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const config = require('../config');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let path = path.join('server', 'images');
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalName);
        }
    })
});

router.get('/user', (req, res) => {
    console.log('get / user')
    res.send({user: req.session.user});
});

router.get('/profile-image-upload', upload.single('profile'), (req, res) => {
    console.log(req.body);
});

module.exports = router;