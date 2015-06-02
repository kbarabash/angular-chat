(function() {
    'use strict';

    function VersionService(loggerService) {
        this.showVersion = function() {
            var version = 'debug';
            if (window.version) {
                version = window.version;
            }
            loggerService.notice(version, 'VersionService');
        };
    }

    angular.module('app.service')
        .service('versionService', ['loggerService', VersionService]);
})();
