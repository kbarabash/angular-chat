(function() {
    'use strict';

    function ListGroupController($scope, dataService) {
        var dataFromService = dataService.getDataByName($scope.name);
        this.title = dataFromService.title;
        this.data = dataFromService.data;
    }

    function ListGroup($templateCache) {
        return {
            restrict: 'AEC',
            replace: true,
            template: $templateCache.get('modules/table/view/coll.directive.html'),
            scope: {
                name: '@'
            },
            controller: ['$scope', 'dataService', ListGroupController],
            controllerAs: 'ctrl'
        };
    }

    angular.module('table')
        .directive('listGroup', ['$templateCache', ListGroup]);
})();
