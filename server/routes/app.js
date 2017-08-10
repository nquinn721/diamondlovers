const express = require('express');
const router = express.Router();
const Image = require('../lib/image');




router.post('/profile-image-upload', (req, res) => {
     Image.storage(req, res, () => {
        if(req.error){
            res.send(req.error);
        }else{
            res.send({msg: 'success'});
        }
     })
    
});


module.exports = router;