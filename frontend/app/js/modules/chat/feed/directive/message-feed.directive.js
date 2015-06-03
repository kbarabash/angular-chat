(function() {
    'use strict';

    function MessageFeedController($scope, messagesFeedService) {
        $scope.model = {
            messages: []
        };

        var updateMessages = function(e) {
            $scope.model.messages.push(e.params);
        }.bind(this);

        messagesFeedService.em.on('updateMessages', updateMessages);
    }

    function MessageFeedDirective($templateCache) {
        return {
            restrict: 'E',
            replace: true,
            template: $templateCache.get('modules/chat/feed/view/message-feed.directive.html'),
            controller: ['$scope', 'messagesFeedService', MessageFeedController],
            controllerAs: 'ctrl'
        };
    }

    angular.module('chat.feed')
        .directive('messageFeed', ['$templateCache', MessageFeedDirective]);
})();
