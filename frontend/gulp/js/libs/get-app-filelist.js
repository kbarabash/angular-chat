'use strict';
var glob = require('glob');

var isPriority = function(file, priorityOptions) {
    for (var i = 0, l = priorityOptions.length; i < l; i++) {
        if (-1 !== file.indexOf(priorityOptions[i])) {
            return true;
        }
    }
    return false;
};

var sortByPriority = function(files, priority) {
    var sortedFiles = [];

    priority.forEach(function(value) {
        var length = files.length;
        var i = 0;
        while (i < length) {
            if (-1 === files[i].indexOf(value)) {
                i++;
                continue;
            }
            sortedFiles.push(files[i]);
            files.splice(i, 1);
            length--;
        }
    });

    return sortedFiles;
};

var getFileList = function(files, options) {
    var priority = {
        high: [],
        low: []
    };
    var fileList = [];
    for (var i = 0, l = files.length; i < l; i++) {
        if (-1 !== options.ignore.indexOf(files[i])) {
            continue;
        }

        if (isPriority(files[i], options.priority.high)) {
            priority.high.push(files[i]);
        } else if (isPriority(files[i], options.priority.low)) {
            priority.low.push(files[i]);
        } else {
            fileList.push(files[i]);
        }
    }

    priority.high = sortByPriority(priority.high, options.priority.high);
    priority.low = sortByPriority(priority.low, options.priority.low);

    fileList = priority.high.concat(fileList);
    fileList = fileList.concat(priority.low);

    return fileList;
};

module.exports = function(src, options, callback) {
    glob(src, {}, function(er, files) {
        if (er) {
            callback([]);
            return;
        }

        callback(
            getFileList(files, options)
        );
    });
};
