'use strict';

var fs = require('fs');

module.exports = function(from, to, encode, changeContent) {
    if (!fs.existsSync(from)) {
        return false;
    }

    var content = fs.readFileSync(from, encode || 'utf8');

    if (changeContent) {
        content = changeContent(content);
    }

    fs.writeFileSync(to, content, encode || 'utf8');

    return true;
};
