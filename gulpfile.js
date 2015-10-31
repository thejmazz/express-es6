'use strict';
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
// var watch      = require('gulp-watch');

var babelify    = require('babelify');
var browserify  = require('browserify');
var assign      = require('lodash.assign');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

function bundle(watch) {
    var browserifyOpts = {
        entries: ['./api.js'],
        debug: true,
        extensions: ['.js'],
        transform: ['babelify']
    };

    var bundler;
    if (watch) {
        bundler = watchify(browserify(assign({}, watchify.args, browserifyOpts)));
    } else {
        bundler = browserify(browserifyOpts);
    }

    function rebundle() {
        bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('.'));
    }

    if (watch) {
        bundler.on('update', rebundle);
    }

    bundler.on('log', gutil.log);

    rebundle();
}

gulp.task('bundle', function() {
    return bundle(false);
});

gulp.task('bundle:watch', function() {
    return bundle(true);
});

// gulp.task('serve', ['bundle:watch', 'inject:js'], function() {
//     watch('./src/js/bundle.js', function() {
//         browserSync.reload();
//     });
// });

gulp.task('default', ['bundle:watch']);
