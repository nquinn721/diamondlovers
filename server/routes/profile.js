const express = require('express');
const router = express.Router();
const StripAPI = require('../apis/stripe');
const formidable = require("express-formidable");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(formidable());
router.use(function(req, res, next){
    req.body = Object.keys(req.fields).length ? req.fields : req.body;
    next();
});


router.get('/user', (req, res) => res.send(req.session.user));
router.post('/addCard', (req, res) => {
    console.log('add card', req.body);
    StripAPI.addCard(req, (e, data) => {
        console.log(e, data);
    })
})

module.exports = router;