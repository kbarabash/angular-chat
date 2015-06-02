(function() {
    angular.module('table')
        .constant('table.router.config', {
            table: {
                url: '/table',
                template: 'modules/table/view/table.html'
            }
        });
})();
