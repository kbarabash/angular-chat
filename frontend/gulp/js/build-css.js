'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var config = require('../build-css.json');

var handleError = function() {
    sass.logError.apply(sass.logError, arguments);
    this.emit('end');
};

gulp.task('build-css', 'Build scss files to main.css', function() {
    return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', handleError))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest));
});
