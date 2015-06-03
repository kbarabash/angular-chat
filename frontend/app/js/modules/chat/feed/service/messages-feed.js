(function() {
    'use strict';

    function MessagesFeedService(chatSocketService, eventManagerService) {
        if (!chatSocketService.isOpenConnection()) {
            chatSocketService.connection();
        }

        this.em = eventManagerService.create();
        var messageCollection = [];

        var addMessage = function(e) {
            e.params.date = new Date();
            messageCollection.push(e.params);
            this.em.trigger('updateMessages', messageCollection);
        }.bind(this);

        chatSocketService.on('message', addMessage);
        chatSocketService.on('sendMessage', addMessage);
    }

    angular.module('chat.feed')
        .service('messagesFeedService', ['chatSocketService', 'eventManagerService', MessagesFeedService]);
})();
