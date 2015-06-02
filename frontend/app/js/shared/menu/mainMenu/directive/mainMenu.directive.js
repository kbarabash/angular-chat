(function() {
    'use strict';

    function MainMenuController(service) {
        this.items = service.getById(this.config, this.id);
    }

    function MainMenuDirective($templateCache) {
        return {
            restrict: 'AE',
            template: $templateCache.get('shared/menu/mainMenu/view/mainMenu.html'),
            scope: true,
            bindToController: {
                id: '@',
                config: '@'
            },
            controllerAs: 'ctrl',
            controller: ['mainMenuService', MainMenuController]
        };
    }

    angular.module('menu.main')
        .directive('mainMenu', ['$templateCache', MainMenuDirective]);
})();
