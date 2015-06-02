'use strict';

var gulp = require('gulp');
var fs = require('fs');
var config = require('../register-files.json');
var getAppFilelist = require('./libs/get-app-filelist');

var fileRead = function(path, encode) {
    if (fs.statSync(path).isDirectory()) {
        return false;
    }
    return fs.readFileSync(path, encode);
};

var writeFileList = function(fileList) {
    fileList = fileList.map(function(file) {
        var path = file.replace(new RegExp('app/', 'g'), '');
        return '\'' + path + '\'';
    });

    var content = fileRead(config.loader.template, config.loader.encode);
    if (!content) {
        console.error('Template file not found');
        return null;
    }
    content = content.replace(new RegExp(config.loader.replaceKey, 'g'), fileList.join(', '));

    if (fs.existsSync(config.loader.dest)) {
        fs.unlinkSync(config.loader.dest);
    }
    fs.writeFileSync(config.loader.dest, content, config.loader.encode);
};

gulp.task('register-files', 'Register files for dev loader', function(cb) {
    getAppFilelist(config.src, config, function(files) {
        if (!files) {
            files = [];
        }
        writeFileList(files);
        cb();
    });
});
