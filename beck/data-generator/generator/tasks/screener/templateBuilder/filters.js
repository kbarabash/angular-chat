var fs = require('fs');
var path = require('path');
var tools = require('./tools');

var prepareFilterContent = function(data) {
    var filterData = data.getData();
    var length = data.getLength();
    return {
        rows: filterData,
        paginatedRowCount: length,
        totalRowCount: length
    };
};

var writeFile = function(filePath, options) {
    filePath = path.normalize(options.currentPath + '/' + filePath);

    var content = JSON.stringify(
        prepareFilterContent(options.data)
    );
    fs.writeFileSync(filePath, content, {
        encoding: options.config.encode
    });
};

var createFilterFile = function(options) {
    options.routes.forEach(function(route) {
        if (typeof route.path === 'string') {
            writeFile(route.path, options);
        } else {
            route.path.forEach(function(item) {
                writeFile(item.path, options);
            });
        }
    });
};

module.exports = function(rootPath, config, data) {
    var currentPath = tools.getPath(rootPath, {
        dest: config.dest,
        folderDest: config.filters.dest
    });
    tools.createRoutesFile(currentPath, {
        routes: config.filters.routes,
        encode: config.encode,
        routeFileName: config.routeFileName
    });

    var routes = config.filters.routes;
    for (var filterName in routes) {
        createFilterFile({
            routes: routes[filterName],
            data: data[filterName],
            config: config,
            currentPath: currentPath
        });
    }
};
