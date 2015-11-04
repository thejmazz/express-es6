'use strict';
var router = require('express').Router();

router.get('/', function(req, res, next) {
    res.send('GET at root\n');
});

module.exports = router;
