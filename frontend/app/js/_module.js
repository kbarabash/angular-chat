// Module: "app"
(function() {
    'use strict';

    angular.module('app', [
        //core
        'app.service',
        'app.config',

        //modules
        'test1',
        'test2',
        'table',

        //shared
        'menu',
        'tools'
    ]);
})();
