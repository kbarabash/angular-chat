'use strict';

var gulp = require('gulp');
var cfsbp = require('./libs/cfsbp');
var clearFolder = require('./libs/clear-folder');
var templateCache = require('gulp-angular-templatecache');
var config = require('../template-builder.json');

var handleError = function(error) {
    console.error(error.message);
    this.emit('end');
};

gulp.task('template-builder', 'Build templates bundles', function() {
    clearFolder(config.dest);
    cfsbp(config.dest, config.access);
    return gulp.src('app/js/**/*.html')
                .pipe(templateCache({
                    module: config.module,
                    filename: config.filename,
                    templateHeader: config.templateHeader,
                    templateFooter: config.templateFooter
                }).on('error', handleError))
                .pipe(gulp.dest(config.dest));
});
