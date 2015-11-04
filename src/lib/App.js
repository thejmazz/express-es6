'use strict';
var path = require('path');
var colors = require('colors');

import config from '../config';

const DIRS = {
    model: '../models',
    middleware: '../middleware/',
    library: '../lib'
};

function tryRequire(moduleName, type) {
    try {
        return require(path.resolve(__dirname, DIRS[type], moduleName));
    } catch (e) {
        console.log('Error'.red + ' requiring ' + type + ' ' + moduleName);
        throw new Error(e);
    }
}

export default {
    config: function() {
        return (process.env.NODE_ENV === 'prod') ? config.prod : config.dev;
    },
    MW: function(middlewareName) {
        return tryRequire(middlewareName, 'middleware');
    },
    Model: function(modelName) {
        return tryRequire(modelName, 'model');
    },
    Lib: function(libName) {
        return tryRequire(libName, 'library');
    }
};
