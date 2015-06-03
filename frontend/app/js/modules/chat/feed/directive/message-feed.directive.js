(function() {
    'use strict';

    function MessageFeedController(messagesFeedService) {
        this.model= {
            messages: []
        };

        var updateMessages = function (e) {
            this.model.messages = e.params;
        }.bind(this);
        messagesFeedService.em.on('updateMessages', updateMessages);
    }

    function MessageFeedDirective($templateCache) {
        return {
            restrict: 'AEC',
            replace: true,
            template: $templateCache.get('modules/chat/feed/view/message-feed.directive.html'),
            controller: ['messagesFeedService', MessageFeedController],
            controllerAs: 'ctrl'
        };
    }

    angular.module('chat.feed')
        .directive('messageFeed', ['$templateCache', MessageFeedDirective]);
})();
