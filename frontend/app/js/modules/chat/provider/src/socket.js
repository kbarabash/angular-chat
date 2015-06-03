(function() {
    'use strict';
    function ChatSocketFactory(socket, CONFIG) {
        return socket.create(CONFIG);
    }

    angular.module('chat.provider')
        .factory('chatSocketService', [
            'socketService', 'CHAT_PROVIDER_CONFIG', ChatSocketFactory
        ]);
})();
