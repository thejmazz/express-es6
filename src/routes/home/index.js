'use strict';
var router = require('express').Router();

function greeting(req, res, next) {
    console.log('Welcome home');
    next();
}

function greeting2(req, res, next) {
    console.log('Please put on slippers');
    next();
}

router.use('/', [greeting, greeting2]);

router.get('/', function(req, res, next) {
    res.send('GET at /home\n');
});

router.post('/', function(req, res, next) {
    res.send('POST at /home');
});

module.exports = router;
