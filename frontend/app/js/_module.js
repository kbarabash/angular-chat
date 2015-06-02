// Module: "app"
(function() {
    'use strict';

    angular.module('app', [
        //core
        'app.service',
        'app.config',

        //modules
        'chat',

        //shared
        'tools'
    ]);
})();
