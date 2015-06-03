(function() {
    'use strict';

    function MessageFeedController($scope) {
        $scope.messages = [{
            message: '123123',
            username: '123123',
            date: new Date()
        }, {
            message: 'asqwerwq',
            username: '12rwqrqwrwqr3123',
            date: new Date()
        }];
    }

    function MessageFeedDirective($templateCache) {
        return {
            restrict: 'AEC',
            replace: true,
            template: $templateCache.get('modules/chat/feed/view/message-feed.directive.html'),
            controller: ['$scope', MessageFeedController],
            controllerAs: 'ctrl'
        }
    }

    angular.module('chat.feed')
        .directive('messageFeed', ['$templateCache', MessageFeedDirective]);
})();
