//create folders structure by path
'use strict';
var fs = require('fs');

module.exports = function createFoldersStructureByPath(path, access) {
    var checkPath = path;
    if ('/' === path[path.length - 1]) {
        checkPath = path.substr(0, path.length - 1);
    }
    if (!fs.existsSync(path)) {
        createFoldersStructureByPath(
            checkPath.substr(
                0, checkPath.lastIndexOf('/')
            )
        );
        fs.mkdirSync(checkPath, access);
    }
    return path;
};
