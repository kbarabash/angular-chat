(function() {
    'use strict';

    function ChatFormCtrl() {
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
