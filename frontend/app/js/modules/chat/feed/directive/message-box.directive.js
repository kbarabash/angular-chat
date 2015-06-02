(function() {
    "use strict";

    function MessageBoxController() {
        this.model = {
            message: 'message',
            username: 'username',
            date: new Date()
        };
    }

    function MessageBoxDirective($templateCache) {
        return {
            restrict: 'AEC',
            replace: true,
            template: $templateCache.get('modules/chat/feed/view/message-box.directive.html'),
            scope: {
                name: '@'
            },
            controller: ['$scope', MessageBoxController],
            controllerAs: 'ctrl'
        }
    }

    angular.module('chat.feed')
        .directive('messageBox', ['$templateCache', MessageBoxDirective]);
})();
