'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var config = require('../test-karma.json');

gulp.task('codeCoverage', 'Create code coverage report', function() {
    return gulp.src([])
        .pipe(karma(config.codeCoverage));
});

gulp.task('test', 'Run unit tests', function() {
    return gulp.src([])
            .pipe(karma(config.test));
});

gulp.task('test-chrome', 'Run unit tests in chrome', function() {
    return gulp.src([])
            .pipe(karma(config['test-chrome']));
});
