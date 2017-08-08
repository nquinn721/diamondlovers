const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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

// router.use(upload.single('profile'));

router.post('/register', upload.single('profile'), function(req, res){
    let user = new User(req.body);
    user.save();
});

router.post('/login', upload.single('profile'), function(req, res){

})


module.exports = router;