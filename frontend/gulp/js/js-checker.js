'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var config = require('../js-checker.json');
var gutil = require('gulp-util');
var merge = require('merge-stream');

gulp.task('js-checker', 'Check JavaScript code style and check jshint', function() {
    var jshintStream = gulp.src(config.src)
        .pipe(jshint(config.jshint.options))
        .pipe(jshint.reporter(jshintStylish))
        .pipe(jshint.reporter('fail'));

    var jscsStream = gulp.src(config.src)
        .pipe(jscs().on('error', function(err) {
            gutil.log(err.message);
            process.exit(1);
        }));

    return merge(jshintStream, jscsStream);
});
