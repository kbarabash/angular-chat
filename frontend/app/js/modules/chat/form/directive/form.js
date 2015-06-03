(function() {
    'use strict';

    function ChatFormCtrl(sendMessageService, logger) {
        var ENTER_KEY = 13;

        this.model = {
            message: '',
            name: Math.random().toString(36).substring(7)
        };

        this.sendMessage = function() {
            if (!this.model.message) {
                return;
            }
            var result = sendMessageService.send(this.model);
            if (result) {
                logger.log('Message sent "' + this.model.message + '"', 'chat.form');
                this.model.message = '';
            }
        };

        this.keyPress = function(e) {
            if (ENTER_KEY !== e.which) {
                return;
            }
            this.sendMessage();
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
