"use strict";
var express = require('express');
var http = require('http');
var config = require('./config.json');
var messageService = require('./message-service');
var WebSocketServer = require('websocket').server;
var app = express();
var server = http.createServer(app);

app.get('/', function (req, res) {
    res.send('Hello World');
    console.log('test');
});

server.listen(config.server.port, function () {
    console.log('Server is listening on port ' + config.server.port);
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    messageService.addConnection(connection);
});

function originIsAllowed() {
    return true;
}