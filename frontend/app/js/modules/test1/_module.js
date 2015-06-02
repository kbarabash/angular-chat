// Module: "test1"
(function() {
    'use strict';

    angular.module('test1', ['app.service'])
        .run(['routerService', 'test1.router.config',
            function(routerService, routerConfig) {
                routerService.stateByConfig(routerConfig);
            }
        ]);
})();
