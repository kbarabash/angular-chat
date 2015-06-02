(function() {
    'use strict';

    var $stateProvider = null;
    var $urlRouterProvider = null;

    function RouterService() {
        this.otherwise = function() {
            $urlRouterProvider.otherwise.apply($urlRouterProvider, arguments);
            return this;
        };

        this.state = function() {
            $stateProvider.state.apply($stateProvider, arguments);
            return this;
        };

        this.stateByConfig = function(routerConfig) {
            var templateProvider = function(route) {
                return ['$templateCache', function($templateCache) {
                    return $templateCache.get(route.template);
                }];
            };

            for (var routerName in routerConfig) {
                $stateProvider.state(routerName, {
                    url: routerConfig[routerName].url,
                    templateProvider: templateProvider(routerConfig[routerName])
                });
            }
            return this;
        };
    }

    angular.module('app.service')
        .config(['$stateProvider', '$urlRouterProvider', function($state, $urlRouter) {
            $stateProvider = $state;
            $urlRouterProvider = $urlRouter;
        }])
        .service('routerService', RouterService);
})();
