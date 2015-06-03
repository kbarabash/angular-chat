(function() {
    'use strict';

    function ChatFormCtrl(sendMessageService) {
        this.model = {
            message: ''
        };

        this.sendMessage = function() {
            if (!this.model.message) {
                return;
            }
            sendMessageService.send(this.model.message);
        };
    }

    function ChatFormDirective($templateCache) {
        return {
            restrict: 'E',
            template: $templateCache.get('modules/chat/form/view/form.html'),
            controllerAs: 'ctrl',
            controller: ['sendMessageService', ChatFormCtrl]
        };
    }

    angular.module('chat.form')
        .directive('chatForm', ['$templateCache', ChatFormDirective]);
})();
