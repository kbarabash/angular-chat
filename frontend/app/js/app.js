'use strict';

//file loader for dev version
(function() {
    var files = ['js/_module.js', 'js/core/app.services/_module.js', 'js/core/config/_module.js', 'js/shared/tools/_module.js', 'js/shared/tools/directives/_module.js', 'js/shared/uicomponents/_module.js', 'js/core/app.services/src/logger-service.js', 'js/core/app.services/src/router-service.js', 'js/core/app.services/src/version-service.js', 'js/core/config/src/config.js', 'js/shared/tools/directives/jsonAttr/jsonAttr.directive.js', 'js/init.js'];

    (function loadFile() {
        if (!files.length) {
            return;
        }

        console.log('LoadFile:' +  files[0]);
        var element = document.createElement('script');
        element.setAttribute('src', files[0]);
        element.setAttribute('type', 'text/javascript');
        element.addEventListener('load', loadFile);
        files.shift();
        document.head.appendChild(element);
    })();
})();
