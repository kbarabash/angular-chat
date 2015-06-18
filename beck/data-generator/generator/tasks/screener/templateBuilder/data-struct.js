var fs = require('fs');
var path = require('path');
var tools = require('./tools');

module.exports = function(rootPath, config, data) {
    var currentPath = tools.getPath(rootPath, {
        dest: config.dest
    });

    var content = {};
    for (var key in data) {
        content[key] = data[key].getData();
    }

    var filePath = path.normalize(currentPath + '/' + config.dataStructFile);
    fs.writeFileSync(filePath, JSON.stringify(content), {
        encoding: config.encode
    });
};
