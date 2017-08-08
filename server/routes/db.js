const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let path = path.join('server', 'images');
            console.log(path);
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalName);
        }
    })
});

// router.use(upload.single('profile'));

router.post('/user', upload.single('profile'), function(req, res){
    console.log(new User(req.body));
    // let user = new User(req.body);
    // user.save();
});


module.exports = router;