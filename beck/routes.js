"use strict";

var path = require('path');
var url = require('url');
var generatorConfig = require('./data-generator/generator/config/config.json');

var TYPES = {
    FILE: 'file'
};
var PARAMS_ALL_VALUES = '*';
var DEFAULT_FILE_NAME = 'filename.file';

var addCORSHeaders = function(res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
};

var isEqualParams = function(a, b) {
    for (var key in b) {
        if (!a.hasOwnProperty(key)) {
            return false;
        }
        if (PARAMS_ALL_VALUES !== a[key] && a[key] != b[key]) {
            return false;
        }
    }
    return true;
};

var updateHeaderByType = function(res, routeData) {
    switch(routeData.type.toLowerCase()) {
        case  TYPES.FILE: {
            var fileName  = DEFAULT_FILE_NAME;
            if (routeData.metaData && routeData.metaData.filename) {
                fileName = routeData.metaData.filename;
            }
            res.append('Content-Disposition', 'attachment; filename="' + fileName + '"');
            break;
        }
    }
};

var sendOK = function(res, rootPath, filePath, routeData) {
    if (routeData.type) {
        updateHeaderByType(res, routeData);
    }

    if (filePath) {
        res.sendFile(path.normalize(rootPath + filePath));
        return;
    }

    res.status(200).send('OK');
};

var initRouteFromGenerator = function (app) {
    var length = generatorConfig.routes.length;
    for (var i = 0; i < length; i++) {
        var obj = require('./' + generatorConfig.routes[i]);
        if (obj) {
            obj.init(app);
        }
    }
};

var initRoutes = function(app, options) {
    app[options.method](options.routeData.route, function(req, res) {
        addCORSHeaders(res);
        if (!Array.isArray(options.routeData.path)) {
            sendOK(res, options.rootPath, options.routeData.path, options.routeData);
            return;
        }

        var withoutParams = null;
        var paths = options.routeData.path;
        var urlParsed = url.parse(req.originalUrl, true);
        for (var i = 0, l = paths.length; i < l; i++) {
            if (!paths[i].params) {
                withoutParams = paths[i].path;
            } else if (isEqualParams(paths[i].params, urlParsed.query)) {
                sendOK(res, options.rootPath, paths[i].path, options.routeData);
                return;
            }
        }

        if (withoutParams) {
            sendOK(res, options.rootPath, withoutParams, options.routeData);
            return;
        }

        res.status(404).send('404');
    });
};

module.exports = {
    initRouteFromGenerator: initRouteFromGenerator,
    appendErrorHandler: function(app) {
        app.use(function errorHandler(err, req, res, next) {
            addCORSHeaders(res);
            var status = err.status || 500;
            res.status(status).render({
                status: status,
                details: {
                    message: err.message,
                    error: err,
                    url: req.originalUrl
                }
            });
        });
        app.use(function error4004Handler(req, res, next) {
            addCORSHeaders(res);
            res.status(404).send({
                status: 404,
                details: {
                    error: 'Not found',
                }
            });
        });
    },
    initRoutes: function (routesConfig, app, rootPath) {
        if (!routesConfig) {
            return;
        }
        for (var i = 0, l = routesConfig.length; i < l; i++) {
            (function addroute(routeData) {
                var method = routeData.method;
                if (!method) {
                    return;
                }

                if (Array.isArray(method)) {
                    method.forEach(function (item) {
                        if (!item) {
                            return;
                        }
                        initRoutes(app, {
                            method: item.toLowerCase(),
                            routeData: routeData,
                            rootPath: rootPath
                        });
                    });
                } else {
                    initRoutes(app, {
                        method: method.toLowerCase(),
                        routeData: routeData,
                        rootPath: rootPath
                    });
                }
            })(routesConfig[i]);
        }
    }
};
