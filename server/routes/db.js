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
    if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.register})
    User.get({
        email: req.body.email.trim(), 
        password: req.body.password.trim(), 
        firstName: req.body.firstName ? req.body.firstName.trim() : null, 
        lastName: req.body.lastName ? req.body.lastName.trim() : null,
        displayName: req.body.displayName ? req.body.displayName.trim() : null
    }, (e, client, doc) => {
        if(doc){
            req.session.user = {
                client: client
            }
            req.session.model = doc;
            res.send(doc);
        }else{
            res.send({error: config.errorMessages.register});
        }

    });
});

router.post('/login', function(req, res){
    console.log(req.body);
    // if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.login.missingInfo});
    User.login(req.body.email.trim(),  req.body.password.trim(), (e, doc, client, cust) => {
        console.log("logged in");

        if(doc){
            console.log('sending user to client');
            req.session.user = {
                client: client,
                stripeCust: cust
            };
            req.session.model = doc;
            console.log(req.session.user);
            res.send(req.session.user);
        }else{
            delete req.session.user;
            res.send({error: config.errorMessages.login.failedLogin});
        }
    });
});


module.exports = router;