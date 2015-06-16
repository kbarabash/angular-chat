var faker = require('faker');
var word = require('./word');
var tools = require('./tools');

var unique = {};
var EMPTY_STRING = '';
var FILTER_SEPARATOR = '|';
var FILTER_SEPARATOR_ARGS = '{:}';
var UNIQUE_FILTER = 'unique';
var isUnique = false;
var isFilter = false;
var cache = {
    'lorem.word': word
};

var executeFilter = function(string, filter) {
    if (!isFilter) {
        if (tools.isFunction(string)) {
            return string();
        }
        return string;
    }

    if (tools.isFunction(string)) {
        if (isUnique) {
            var newString = string();
            var uniqueId = filter.split(FILTER_SEPARATOR_ARGS)[1];
            while (true) {
                if (-1 !== unique[uniqueId].indexOf(newString)) {
                    newString = string();
                } else {
                    break;
                }
            }
            string = newString;
            unique[uniqueId].push(string);
        } else {
            string = string();
        }
    }

    if (!tools.isString(string)) {
        if (Array.isArray(string)) {
            string = string.join(', ');
        } else if (!tools.isDate(string)){
            string = string.toString();
        }
    }

    var args = filter.split(FILTER_SEPARATOR_ARGS);
    if (1 == args.length) {
        if (string[filter]) {
            return string[filter]();
        }
        return string;
    }

    if (string[args[0]]) {
        return string[args[0]](args[1]);
    }
    return string;
};


module.exports = function(path) {
    var filter = null;
    isFilter = -1 !== path.indexOf(FILTER_SEPARATOR);
    if (isFilter) {
        path = path.split(FILTER_SEPARATOR);
        filter = path[1];
        path = path[0];
    }
    isUnique = isFilter && -1 !== filter.indexOf(UNIQUE_FILTER);

    if (isUnique) {
        var uniqueId = filter.split(FILTER_SEPARATOR_ARGS)[1];
        if (!uniqueId) {
            isUnique = false;
        } else if (!unique[uniqueId]) {
            unique[uniqueId] = [];
        }
    }

    if (cache[path]) {
        return executeFilter(
            cache[path], filter
        );
    }

    if (!path) {
        cache[path] = EMPTY_STRING;
        return executeFilter(
            EMPTY_STRING, filter
        );
    }

    path  = path.split('.');
    if (!path.length) {
        cache[path] = EMPTY_STRING;
        return executeFilter(
            EMPTY_STRING, filter
        );
    }

    //find method
    var method = faker;
    while (path.length) {
        var mthd = path.shift();

        if (!method[mthd]) {
            method = null;
            break;
        }

        method = method[mthd];
    }

    if (tools.isFunction(method)) {
        cache[path] = method;
        return executeFilter(
            method, filter
        );
    }

    cache[path] = EMPTY_STRING;
    return executeFilter(
        EMPTY_STRING, filter
    );
};
