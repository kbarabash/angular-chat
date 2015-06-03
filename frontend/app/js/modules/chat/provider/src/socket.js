(function() {
    'use strict';
    function ChatSocketFactory(socket, CONFIG, logger) {
        var mySocket = socket.create(CONFIG);
        mySocket.on('error', function logErrors(e) {
            logger.error(e, 'ChatSocketFactory');
        });
        return mySocket;
    }

    angular.module('chat.provider')
        .factory('chatSocketService', [
            'socketService', 'CHAT_PROVIDER_CONFIG', 'loggerService', ChatSocketFactory
        ]);
})();
