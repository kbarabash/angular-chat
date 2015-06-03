(function() {
    angular.module('chat.provider')
        .constant('CHAT_PROVIDER_CONFIG', {
            url: 'ws://localhost:8080/',
            isUseEchoProtocol: true
        });
})();
