(function() {
    'use strict';

    function SendMessageService(dataProvider) {
        this.send = function(message) {
            if (!dataProvider.isOpenConnection()) {
                if (!dataProvider.connection()) {
                    throw new Error('Error connect');
                }
            }
            console.log(message);
        };
    }

    angular.module('chat.form')
        .service('sendMessageService', ['chatSocketService', SendMessageService]);
})();
