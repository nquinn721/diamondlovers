const express = require('express');
const router = express.Router();
const config = require('../config');
const formidable = require("express-formidable");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(formidable());
router.use(function(req, res, next){
    req.body = Object.keys(req.fields).length ? req.fields : req.body;
    next();
});

router.post('/register', function(req, res){
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
    if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.login.missingInfo});
    User.login(req.body.email.trim(),  req.body.password.trim(), (e, doc, client, cust) => {
        console.log("logged in");

        if(doc){
            console.log('sending user to client');
            req.session.user = {
                client: client,
                stripeCust: cust
            };
            req.session.model = doc;
            res.send(req.session.user);
        }else{
            delete req.session.user;
            res.send({error: config.errorMessages.login.failedLogin});
        }
    });
});


module.exports = router;