'use strict';
var webpack = require('webpack');

var nodeModules = {};
require('fs').readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './api.js',
    target: 'node',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devtool: 'sourcemap',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        })
    ],
    externals: nodeModules
};
