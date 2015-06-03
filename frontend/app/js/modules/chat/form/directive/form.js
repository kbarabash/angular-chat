(function() {
    'use strict';

    function ChatFormCtrl(sendMessageService, logger) {
        this.model = {
            message: ''
        };

        this.sendMessage = function() {
            if (!this.model.message) {
                return;
            }
            var result = sendMessageService.send(this.model.message);
            if (result) {
                logger.log('Message sent "' + this.model.message + '"', 'chat.form');
                this.model.message = '';
            }
        };
    }

    function ChatFormDirective($templateCache) {
        return {
            restrict: 'E',
            template: $templateCache.get('modules/chat/form/view/form.html'),
            controllerAs: 'ctrl',
            controller: ['sendMessageService', 'loggerService', ChatFormCtrl]
        };
    }

    angular.module('chat.form')
        .directive('chatForm', ['$templateCache', ChatFormDirective]);
})();
