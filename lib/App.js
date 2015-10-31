'use strict';
var path = require('path');
var colors = require('colors');

import config from '../config';

const DIRS = {
    model: './models',
    middleware: '../middleware/',
    library: './lib'
};

function tryRequire(moduleName, type) {
    try {
        return require(path.resolve(DIRS[type], moduleName) + '.js');
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
        // Doesn't work
        // return tryRequire(middlewareName, 'middleware');
        try {
            // doesn't work
            // return require(DIRS.middleware + middlewareName + '.js');

            // works because explicit
            return require('../middleware/' + middlewareName + '.js');
        } catch (e) {
            console.log('Error'.red + ' requiring middleware ' + middlewareName);
            throw new Error(e);
        }
    },
    Model: function(modelName) {
        return tryRequire(modelName, 'model');
    },
    Lib: function(libName) {
        return tryRequire(libName, 'library');
    }
};
