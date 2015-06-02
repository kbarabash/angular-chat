'use strict';

var gulp = require('gulp');
var async = require('async');
var clearFolder = require('./libs/clear-folder');
var cfsbp = require('./libs/cfsbp');
var fs = require('fs');
var path = require('path');
var config = require('../build.json');
var getAppFilelist = require('./libs/get-app-filelist');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var copy = require('./libs/copy');
var gutil = require('gulp-util');

var log = function(text) {
    gutil.log(gutil.colors.blue(text));
};

var prepareBuildFolder = function() {
    if (fs.existsSync(config.path)) {
        clearFolder(config.path);
    } else {
        fs.mkdirSync(config.path, config.access);
    }
};

var createTaskForJs = function(callback) {
    var options = config.js;
    getAppFilelist(options.appjs.src, options.appjs, function(files) {
        //get path for js folder and create this folder
        var jsPath = config.path + options.path;
        cfsbp(jsPath);

        //create libs.js
        copy(
            options.libsjs.src, jsPath + options.libsjs.filename,
            config.encode
        );

        //crete task for app.js
        var appJS = gulp.src(files)
                .pipe(concat(options.appjs.filename));
        if (options.isMinify) {
            appJS.pipe(uglify({
                outSourceMap: true
            }));
        }
        appJS.pipe(gulp.dest(jsPath));

        callback(appJS);
    });
};

var createTaskForIndexHTML = function(callback) {
    var options = config.indexHtml;
    copy(options.src, config.path + options.filename, config.encode, function(content) {
        log('Replace version');
        var version = fs.readFileSync(options.versionFile, config.encode);
        version = options.replace.to.replace(
            new RegExp(options.replace.key, 'g'),
            version.replace(/(\r\n|\n|\r)/gm, '')
        );

        return content.replace(
            new RegExp(options.replace.from, 'g'), version
        );
    });
    callback();
};

var copyRecursiveSync = function(src, dest) {
    var options = config.content;
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            var from = path.join(src, childItemName);
            if (-1 === options.ignore.indexOf(from)) {
                copyRecursiveSync(from, path.join(dest, childItemName));
            }
        });
    } else {
        copy(src, dest, config.encode);
    }
};

//copy content
var createTaskForContent = function(callback) {
    var options = config.content;
    copyRecursiveSync(options.src, config.path + options.dest);
    callback();
};

gulp.task('build', 'Build script for project', config.commands, function(cb) {
    prepareBuildFolder();

    var jsTask = null;
    async.waterfall([
        function(callback) { //js files task
            log('Start: build script for js');
            createTaskForJs(function(task) {
                log('Finish: build script for js');
                if (task) {
                    jsTask = task;
                }
                callback();
            });
        },
        function(callback) { //index.html
            log('Start: build script for index.html');
            createTaskForIndexHTML(callback);
            log('Finish: build script for index.html');
        },
        function(callback) { //content
            log('Start: build script for content');
            createTaskForContent(callback);
            log('Finish: build script for content');
        }
    ], function() {
        if (jsTask) {
            jsTask.on('end', cb);
        } else {
            cb();
        }
    });
});
