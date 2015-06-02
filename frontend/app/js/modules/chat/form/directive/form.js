(function() {
    'use strict';

    function ChatFormCtrl() {
        this.model = {
            message: ''
        };

        this.sendMessage = function() {
            if (!this.model.message) {
                return;
            }
            console.log(this.model.message);
        };
    }

    function ChatFormDirective($templateCache) {
        return {
            restrict: 'E',
            template: $templateCache.get('modules/chat/form/view/form.html'),
            controllerAs: 'ctrl',
            controller: ChatFormCtrl
        };
    }

    angular.module('chat.form')
        .directive('chatForm', ['$templateCache', ChatFormDirective]);
})();