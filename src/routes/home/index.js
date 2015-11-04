'use strict';
var router = require('express').Router();

router.get('/', function(req, res, next) {
    res.send('GET at /home\n');
});

router.post('/', function(req, res, next) {
    res.send('POST at /home');
});

module.exports = router;
