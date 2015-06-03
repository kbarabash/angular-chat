(function() {
    'use strict';

    function SendMessageService(dataProvider) {
        this.send = function(message) {
            if (!dataProvider.isOpenConnection()) {
                dataProvider.connection();
            }
            dataProvider.send(JSON.stringify({
                message: message,
                name: 'user1'
            }));
            return true;
        };
    }

    angular.module('chat.form')
        .service('sendMessageService', ['chatSocketService', SendMessageService]);
})();
