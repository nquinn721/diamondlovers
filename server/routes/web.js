const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', function(req, res){
    res.render('index', {dirs: fs.readdirSync('server/images')});
});


module.exports = router;