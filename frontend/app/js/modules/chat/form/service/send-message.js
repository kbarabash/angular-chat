(function() {
    'use strict';

    function SendMessageService(dataProvider) {
        this.send = function(model) {
            if (!dataProvider.isOpenConnection()) {
                dataProvider.connection();
            }
            dataProvider.send({
                message: model.message,
                name: model.name,
                date: Date.now()
            });
            return true;
        };
    }

    angular.module('chat.form')
        .service('sendMessageService', ['chatSocketService', SendMessageService]);
})();
