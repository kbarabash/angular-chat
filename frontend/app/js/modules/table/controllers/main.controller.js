(function() {
    'use strict';

    function MainController() {
    }

    angular.module('table')
        .controller('MainController', ['dataService', MainController]);
})();
