var fs = require('fs');
var path = require('path');

var getPath = function(rootPath, options) {
    var dest = path.normalize(rootPath + '/' + options.dest);
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    if (!options.folderDest) {
        return dest;
    }
    var folderPath =  path.normalize(dest + '/' + options.folderDest);
    if (fs.existsSync(folderPath)) {
        rmDir(folderPath);
    }
    fs.mkdirSync(folderPath);
    return folderPath;
};

var createRoutesFile = function(currentPath, options) {
    var content = [];
    var routes = options.routes;
    for (var key in routes) {
        for (var i = 0, l = routes[key].length; i < l; i++) {
            content.push(routes[key][i]);
        }
    }

    var routeFilePath =  path.normalize(currentPath + '/' + options.routeFileName);
    fs.writeFileSync(routeFilePath, JSON.stringify(content), {
        encoding: options.encoding
    });
};

var rmDir = function(path) {
    if (!fs.existsSync(path)) {
        return;
    }

    fs.readdirSync(path).forEach(function(file) {
        var curPath = path + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
            rmDir(curPath);
        } else {
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(path);
};

module.exports = {
    createRoutesFile: createRoutesFile,
    getPath: getPath,
    rmDir: rmDir
};
