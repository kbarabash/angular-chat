//clean folder recursive
'use strict';
var fs = require('fs');

module.exports = function clearFolder(path) {
    if (!fs.existsSync(path)) {
        return true;
    }

    var items = fs.readdirSync(path);
    for (var i = 0 ; i < items.length; i++) {
        var item = path + '/' + items[i];

        if (fs.statSync(item).isDirectory()) {
            clearFolder(item);
            fs.rmdirSync(item);
        } else {
            fs.unlinkSync(item);
        }
    }
    return true;
};
