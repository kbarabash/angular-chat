(function() {
    'use strict';

    function SendMessageService(dataProvider) {
        this.send = function(message) {
            if (!dataProvider.isOpenConnection()) {
                if (!dataProvider.connection()) {
                    throw new Error('Error connect');
                }
            }
            dataProvider.send(JSON.stringify({
                message: message,
                name: 'user1'
            }));
        };
    }

    angular.module('chat.form')
        .service('sendMessageService', ['chatSocketService', SendMessageService]);
})();
