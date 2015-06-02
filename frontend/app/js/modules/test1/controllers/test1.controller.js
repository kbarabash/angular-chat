(function() {
    'use strict';

    function Test1Controller() {
        this.title = 'Test Controller 1';
        this.text = 'Test1Controller text';
        this.user = {
            name: 'test',
            date: new Date()
        };
    }

    angular.module('test1')
        .controller('Test1Controller', Test1Controller);
})();
