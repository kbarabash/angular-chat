(function() {
    'use strict';

    angular.module('app').run(['versionService', 'routerService',
        function(versionService, routerService) {
            versionService.showVersion();
            routerService.otherwise('/test1');
        }
    ]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);
    });
})();
