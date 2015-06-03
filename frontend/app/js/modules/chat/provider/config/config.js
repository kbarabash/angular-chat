(function() {
    angular.module('chat.provider')
        .constant('CHAT_PROVIDER_CONFIG', {
            url: 'ws://172.30.227.39:8080/',
            isUseEchoProtocol: true
        });
})();
