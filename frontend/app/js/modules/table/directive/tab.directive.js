(function() {
    'use strict';

    function TabsController($scope, dataService) {
        var dataFromService = dataService.getDataByName($scope.name);
        this.title = dataFromService.title;
        this.data = dataFromService.data;
        this.tabs = [{
            name: 'overview',
            text: 'Overview'
        }, {
            name: 'details',
            text: 'Details'
        }, {
            name: 'broaderTopics',
            text: 'Broader Topics'
        }];
    }

    function TabsDirective($templateCache) {
        return {
            restrict: 'AEC',
            replace: true,
            template: $templateCache.get('modules/table/view/tabs.directive.html'),
            scope: {
                name: '@'
            },
            controller: ['$scope', 'dataService', TabsController],
            controllerAs: 'ctrl'
        };
    }

    angular.module('table')
        .directive('tabsDirective', ['$templateCache', TabsDirective]);
})();
