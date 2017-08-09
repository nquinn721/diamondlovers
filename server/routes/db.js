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
    User.register({email: req.body.email, password: req.body.password});
});

router.post('/login', upload.single('profile'), function(req, res){
    User.login(req.body.email,  req.body.password, (e, doc) => {
        console.log(e, doc);
        if(doc){
            req.session.user = doc;
            res.send(doc);
        }else{
            delete req.session.user;
            res.send({error: 'failed to login'});
        }
    });
});


module.exports = router;