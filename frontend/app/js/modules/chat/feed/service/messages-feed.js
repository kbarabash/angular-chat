(function() {
    'use strict';

    function MessagesFeedService(chatSocketService) {
        chatSocketService.on('message', function onMessage(e) {
            console.log(e.params);
        });
    }

    angular.module('chat.feed')
        .service('messagesFeedService', ['chatSocketService', MessagesFeedService]);
})();
