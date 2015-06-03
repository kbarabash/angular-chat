(function() {
    'use strict';

    function MessagesFeedService(chatSocketService) {}

    angular.module('chat.feed')
        .service('messagesFeedService', ['chatSocketService', MessagesFeedService]);
})();
