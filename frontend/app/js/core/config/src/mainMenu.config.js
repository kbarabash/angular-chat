(function() {
    'use strict';

    angular.module('app.config')
        .constant('mainMenu-config', {
            mainSiteMenu: [{
                type: 'title',
                text: 'Title-test'
            }, {
                type: 'link',
                text: 'Index',
                attr: {
                    href: '#'
                }
            }, {
                type: 'link',
                text: 'test1',
                attr: {
                    'ui-sref': 'test1'
                }
            }, {
                type: 'link',
                text: 'test2',
                subItems: [{
                    type: 'title',
                    text: 'subitem1'
                }, {
                    type: 'link',
                    text: 'test1231231',
                    attr: {
                        'ui-sref': 'test1'
                    }
                }],
                attr: {
                    'ui-sref': 'test2'
                }
            }, {
                type: 'link',
                text: 'table',
                attr: {
                    'ui-sref': 'table'
                }
            }]
        });
})();
