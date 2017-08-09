const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    console.log('get / user')
    res.send({user: req.session.user});
});

module.exports = router;