// Module: "test2"
(function() {
    'use strict';

    angular.module('test2', ['app.service'])
        .run(['routerService', 'test2.router.config',
            function(routerService, routerConfig) {
                routerService.stateByConfig(routerConfig);
            }
        ]);
})();
