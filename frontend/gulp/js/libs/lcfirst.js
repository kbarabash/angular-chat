'use strict';

module.exports = function(str) {
    var f = str.charAt(0).toLocaleLowerCase();
    return f + str.substr(1, str.length - 1);
};
