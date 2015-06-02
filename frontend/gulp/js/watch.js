'use strict';

var gulp = require('gulp');
var watchConfig = require('../watch.json');

gulp.task('watch', 'Gulp watch task', function() {
    var createTask = function(files, tasks) {
        gulp.watch(files, tasks);
    };

    for (var key in watchConfig) {
        createTask(watchConfig[key].files, watchConfig[key].tasks);
    }
});
