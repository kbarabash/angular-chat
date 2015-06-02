'use strict';

var gulpHelp = require('gulp-help');
gulpHelp(require('gulp'));

//load all tasks
var requireDir = require('require-dir');
requireDir('./gulp/js/', {
    recurse: false
});
