const express = require('express');
const router = express.Router();
const config = require('../config');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.post('/register', upload.single('profile'), function(req, res){
    User.register({
        email: req.body.email.trim(), 
        password: req.body.password.trim(), 
        firstName: req.body.firstName.trim(), 
        lastName: req.body.lastName.trim(),
        displayName: req.body.displayName.trim()
    }, (e, doc) => {
        if(doc){
            req.session.user = doc;
            res.send(doc);
        }else{
            res.send({error: config.errorMessages.register});
        }

    });
});

router.post('/login', function(req, res){
    console.log(req.body);
    User.login(req.body.email.trim(),  req.body.password.trim(), (e, doc) => {
        console.log(e, doc);
        if(doc){
            req.session.user = doc;
            res.send(doc);
        }else{
            delete req.session.user;
            res.send({error: config.errorMessages.login});
        }
    });
});


module.exports = router;