const express = require('express');
const router = express.Router();
// router.use((req, res, next) => {
//     req.session.jitterbug = 'oweifj';
//     next();
// });
router.get('/', function(req, res){
    req.session.bite = {cool :true}
    res.render('index');
});


module.exports = router;