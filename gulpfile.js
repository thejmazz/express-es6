'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var webpack = require('webpack');

var bundle = 'build/bundle.js';

// To filter out node_modules from webpack
var nodeModules = {};
require('fs').readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var webpackConfig = {
    entry: './src/api',
    target: 'node',
    output: {
        path: __dirname,
        filename: bundle
    },
    devtool: 'sourcemap',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        })
    ],
    externals: nodeModules
};

gulp.task('webpack', function(done) {
  webpack(webpackConfig).run(function(err, stats) {
    if(err) {
      gutil.log('Error', err);
    }
    else {
      gutil.log(stats.toString({colors: true}));
    }
    done();
  });
});

gulp.task('nodemon', ['webpack'], function() {
    nodemon({
        script: bundle,
        ignore: ['src/*']
    });
});

gulp.task('watch', ['nodemon'], function() {
    watch(['./src/**/*.js'], function() {
        gulp.start('webpack');
    });
});

gulp.task('default', ['watch']);
