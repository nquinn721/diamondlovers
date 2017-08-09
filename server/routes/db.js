const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const config = require('../config');
const bodyParser = require('body-parser');
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
    User.register({
        email: req.body.email, 
        password: req.body.password, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        displayName: req.body.displayName
    }, (e, doc) => {
        if(doc){
            req.session.user = doc;
            res.send(doc);
        }else{
            res.send({error: config.errorMessages.register});
        }

    });
});

router.post('/login', bodyParser.json(), function(req, res){
    console.log(req.body);
    // User.login(req.body.email,  req.body.password, (e, doc) => {
    //     console.log(e, doc);
    //     if(doc){
    //         req.session.user = doc;
    //         res.send(doc);
    //     }else{
    //         delete req.session.user;
    //         res.send({error: config.errorMessages.login});
    //     }
    // });
});


module.exports = router;