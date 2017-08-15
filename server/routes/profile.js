const express = require('express');
const router = express.Router();
const StripAPI = require('../apis/stripe');

router.get('/user', (req, res) => res.send(req.session.user));
router.get('/cards', (req, res) => )

module.exports = router;