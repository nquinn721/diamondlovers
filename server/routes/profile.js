const express = require('express');
const router = express.Router();
const StripAPI = require('../apis/stripe');
const formidable = require("express-formidable");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(formidable());
router.use(function(req, res, next){
    req.body = req.fields && Object.keys(req.fields).length ? req.fields : req.body;
    next();
});


router.get('/user', (req, res) => res.send(req.session.user));
router.post('/addCard', (req, res) => {
    StripAPI.addCard(req, updateClientWithStripeUser.bind(this, req, res));
});
router.post('/removeCard', (req, res) => {
    StripAPI.removeCard(req, updateClientWithStripeUser.bind(this, req, res));
});
router.post('/updateDefaultCard', (req, res) => {
    StripAPI.updateDefaultCard(req, updateClientWithStripeUser.bind(this, req, res));
});
router.post('/chargeCard', (req, res) => {
    StripAPI.charge(req, (e, cust, charge) => {
        if(charge && charge.status === 'succeeded'){
            User.addDiamonds(req.session.user.email, charge.amount / 10, (e, user) => {
                req.session.user = user;
                req.session.user.stripeCust = cust;
                
                res.send(req.session.user)
            });
        }else{
            res.send({error: 'failed to charge card'});
        }
    });
});

function updateClientWithStripeUser(req, res, e, data){
    if(data){
        req.session.user.stripeCust = data;
        res.send(req.session.user);
    }else{
        res.send(e);
    }
}

module.exports = router;