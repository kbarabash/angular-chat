'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var config = require('../create-module.json');
var gutil = require('gulp-util');
var copy = require('./libs/copy');
var cfsbp = require('./libs/cfsbp');

var getArgv = function() {
    var argv = {
        module: '',
        controller: config.default.controller
    };

    var regexp = /^[\w\.\-]+$/;

    if (gutil.env.module && regexp.test(gutil.env.module)) {
        argv.module = gutil.env.module;
    }

    if (gutil.env.controller && regexp.test(gutil.env.controller)) {
        argv.controller = gutil.env.controller;
    }

    return argv;
};

var replaceKeys = function(options, content) {
    var replaceKeys = config.template.replaceKeys;
    for (var key in replaceKeys) {
        content = content.replace(new RegExp(replaceKeys[key], 'g'), options[key]);
    }
    return content;
};

var copyFiles = function(modulePath, file, options) {
    var from = path.normalize(config.template.path + file.path + '' + file.template);
    var to = path.normalize(modulePath + file.path);
    cfsbp(to, config.access);

    to += replaceKeys(options, file.filename);

    gutil.log(gutil.colors.blue('Copy from: ' + from + ' to: ' +   to));
    copy(from, to, config.encode, replaceKeys.bind(null, options));
};

var createModuleFolder = function(moduleName) {
    var modulePath = path.normalize(config.modulePath + moduleName + '/');
    if (fs.existsSync(modulePath)) {
        return false;
    }
    fs.mkdirSync(modulePath, config.access);
    return modulePath;
};

var description = 'Create file structure for module.'
    + '\n\t\tOptions:'
    + '\n\t\t  module     - name of module'
    + '\n\t\t  controller - name of controller(default name is "MainController")\n';
gulp.task('create-module', description, function() {
    var argv = getArgv();

    if (!argv.module) {
        gutil.log(
            gutil.colors.red(
                'Error: enter correct module name, please'
            )
        );
        process.exit(1);
        return false;
    }

    var modulePath = createModuleFolder(argv.module);
    if (!modulePath) {
        gutil.log(
            gutil.colors.red(
                'Error: module with name "' + argv.module + '" already exists'
            )
        );
        process.exit(1);
        return false;
    }

    var files = config.template.files;
    for (var i = 0, l = files.length; i < l; i++) {
        copyFiles(modulePath, files[i], argv);
    }

    gulp.start('register-files');
});
