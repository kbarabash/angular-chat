'use strict';

//file loader for dev version
(function() {
    var files = ['js/_module.js', 'js/core/app.services/_module.js', 'js/core/config/_module.js', 'js/modules/table/_module.js', 'js/modules/test1/_module.js', 'js/modules/test2/_module.js', 'js/shared/menu/_module.js', 'js/shared/menu/mainMenu/_module.js', 'js/shared/tools/_module.js', 'js/shared/tools/directives/_module.js', 'js/shared/uicomponents/_module.js', 'js/core/app.services/src/logger-service.js', 'js/core/app.services/src/router-service.js', 'js/core/app.services/src/version-service.js', 'js/core/config/src/config.js', 'js/core/config/src/mainMenu.config.js', 'js/modules/table/config/router.config.js', 'js/modules/table/controllers/main.controller.js', 'js/modules/table/directive/list-group.directive.js', 'js/modules/table/directive/tab.directive.js', 'js/modules/table/service/data.service.js', 'js/modules/test1/config/router.config.js', 'js/modules/test1/controllers/test1.controller.js', 'js/modules/test2/config/router.config.js', 'js/modules/test2/controllers/test2.controller.js', 'js/shared/menu/mainMenu/directive/mainMenu.directive.js', 'js/shared/menu/mainMenu/service/mainMenu.service.js', 'js/shared/tools/directives/jsonAttr/jsonAttr.directive.js', 'js/bin/view/templates.js', 'js/init.js'];

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
