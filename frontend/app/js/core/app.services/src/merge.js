(function() {
    'use strict';

    function MergeService() {
        return function merge() {
            var stack = arguments[0];
            for (var k = 1, ln = arguments.length; k < ln; k++) {
                var object = arguments[k];
                if (typeof (object) !== 'object') {
                    continue;
                }
                for (var i in object) {
                    if (!object.hasOwnProperty(i)) {
                        continue;
                    }
                    if (null !== stack[i]
                        && typeof (stack[i]) === 'object'
                        && object[i]
                        && typeof (object[i]) === 'object'
                        && !object[i].nodeType
                        && !Array.isArray(object[i])
                    ) {
                        stack[i] = merge(stack[i], object[i]);
                    } else {
                        stack[i] = object[i];
                    }
                }
            }
            return stack;
        };
    }

    angular.module('app.service')
        .service('mergeService', MergeService);
})();
