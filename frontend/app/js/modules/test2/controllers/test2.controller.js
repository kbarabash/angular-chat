(function() {
    'use strict';

    function Test2Controller() {
        this.title = 'Test Controller 2';
        this.text = 'Test2Controller text';
    }

    angular.module('test2')
        .controller('Test2Controller', Test2Controller);
})();
