"use strict";
var forever = require('forever-monitor');

var child = new (forever.Monitor)('./app/server.js', {
    silent: false
});

child.on('exit', function () {
    console.log('server.js has exited after 3 restarts');
});

child.on('watch:restart', function (info) {
    console.log(info);
    console.error('Restarting script because ' + info.file + ' changed');
});

child.on('restart', function () {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function (code) {
    console.error('Forever detected script exited with code ' + code);
});

child.start();