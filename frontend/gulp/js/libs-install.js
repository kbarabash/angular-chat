'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var config = require('../libs-install.json');
var gutil = require('gulp-util');

var getConcatOptions = function() {
    var types = Object.keys(config.concat.types);
    var type = gutil.env.type;
    if (type) {
        type = type.toLocaleUpperCase();
    }
    if (-1 === types.indexOf(type)) {
        type = config.concat.defaultType;
    }
    return config.concat.types[type];
};

gulp.task('libs-install', 'Loading all dependencies and creating libs.js file from them', function() {
    var cleanFolder = gulp.src(config.concat.libsPath, {read: false})
                            .pipe(clean());

    var bowerInstall = gulp.src('./', {read: false})
                            .pipe(shell(config.commands));

    var concatFiles = [];
    var concatOptions = getConcatOptions();
    for (var i = 0, l = concatOptions.files.length; i < l; i++) {
        concatFiles.push(config.concat.libsPath + concatOptions.files[i]);
    }
    var libsConcat = gulp.src(concatFiles)
        .pipe(concat(config.concat.filename));
    if (concatOptions.isMinify) {
        libsConcat.pipe(uglify());
    }
    libsConcat.pipe(gulp.dest(config.concat.dest));

    return merge(cleanFolder, bowerInstall, libsConcat);
});
