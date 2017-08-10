const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', function(req, res){
    recursive('server/images', function (err, files) {
        res.render('index', {dirs: files});
    });
});


module.exports = router;