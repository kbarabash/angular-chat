(function() {
    'use strict';

    function JsonAttrDirective($compile) {
        return {
            priority: 1001,
            restrict: 'A',
            scope: {
                jsonAttr: '@'
            },
            link: function($scope, $element) {
                if (!$element.attr('json-attr')) {
                    return;
                }
                if ($scope.jsonAttr) {
                    var attr = angular.fromJson($scope.jsonAttr);
                    if (attr) {
                        $element.attr(attr);
                        $element.removeAttr('json-attr');
                        $compile($element)($scope.$parent);
                    }
                }
            }
        };
    }

    angular.module('tools.directives')
        .directive('jsonAttr', [
            '$compile', JsonAttrDirective
        ]);
})();
