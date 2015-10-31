'use strict';
var express = require('express');
var app = express();

import App from './lib/App';

console.log(App.MW('globals').foo);

// console.log(require('/Users/jmazz/Documents/repos/express-es6/middleware/globals').foo);
