// Module: "Table"
(function() {
    'use strict';

    angular.module('table', ['app.service'])
        .run(['routerService', 'table.router.config',
            function(routerService, routerConfig) {
                routerService.stateByConfig(routerConfig);
            }
        ]);
})();
