(function() {
    'use strict';

    function MainMenuService() {
        var getConfig = function(configPath) {
            if (!angular.isString(configPath)) {
                return null;
            }

            var components = configPath.split('/');
            if (2 > components.length || !components.length) {
                return null;
            }

            var injector = angular.injector([components[0]]);
            return injector.get(components[1]);
        };

        this.getById = function(configPath, id) {
            var config = getConfig(configPath);
            if (!config || !config.hasOwnProperty(id)) {
                return [];
            }
            return config[id];
        };
    }

    angular.module('menu.main')
        .service('mainMenuService', MainMenuService);
})();
