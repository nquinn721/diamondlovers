const express = require('express');
const router = express.Router();
const Image = require('../lib/image');
const formidable = require("express-formidable");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(formidable());
router.use(function(req, res, next){
    req.body = req.fields && Object.keys(req.fields).length ? req.fields : req.body;
    next();
});


router.post('/delete-all-images', (req, res) => {
    Image.deleteAllImages();
    res.send('ok');
});

module.exports = router;