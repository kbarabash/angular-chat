"use strict";

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var serverConfig = require('./config/server.config');
var routes = require('./routes');

var app = express();
app.use(express.static(serverConfig.express.static));
app.use(bodyParser.urlencoded({
    'extended': serverConfig.bodyParser.extended
}));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);





app.use(bodyParser.json({
    type: serverConfig.bodyParser.type
}));
(function loadRoutes(path) {
    fs.readdirSync(path).forEach(function(file) {
        var curPath = path + '/' + file;
        if (fs.lstatSync(curPath).isFile()) {
            var isRoutesConfig = -1 !== curPath.indexOf(serverConfig.routes.filename);
            if (isRoutesConfig) {
                var routeConf = null;
                try {
                    routeConf = require(curPath);
                    console.log('routes.config loaded: ' + curPath);
                } catch(ex) {
                    console.log('Can`t load routes.config: ' + curPath);
                    return ;
                }
                routes.initRoutes(routeConf, app, path + '/');
            }
        } else {
            loadRoutes(curPath);
        }
    });
})(__dirname + '/' + serverConfig.routes.path);

routes.appendErrorHandler(app);

app.listen(serverConfig.port);
console.log("Application runtime... \nAT " + serverConfig.port + " PORT");
