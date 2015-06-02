'use strict';

//file loader for dev version
(function() {
    var files = ['{%file_list%}'];

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
