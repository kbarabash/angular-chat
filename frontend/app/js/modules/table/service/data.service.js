(function() {
    'use strict';

    function DataService() {
        var data = {
            path: {
                title: 'Path',
                data: {
                    table: {
                        name: 'Table',
                        data: [{
                            text: 'text',
                            id: 1
                        }],
                        isShowData: false
                    },
                    phone: {
                        name: 'Phone',
                        data: [{
                            text: 'phone 1',
                            id: 2
                        }, {
                            text: 'phone 2',
                            id: 3
                        }],
                        isShowData: false
                    }
                }
            },
            concept: {
                title: 'Concept',
                data: {
                    table: {
                        name: 'concept',
                        data: [{
                            text: 'concept',
                            id: 1
                        }, {
                            text: 'concept 2',
                            id: 2
                        }],
                        isShowData: false
                    },
                    phone: {
                        name: 'Phone',
                        data: [{
                            text: 'phone 1',
                            id: 2
                        }, {
                            text: 'phone 2',
                            id: 3
                        }],
                        isShowData: false
                    }
                }
            },
            details: {
                title: 'Details',
                data: {

                }
            }
        };

        /**
         * Return data by name
         * @param name
         * @return {*}
         */
        this.getDataByName = function (name) {
            return data[name];
        };
    }

    angular.module('table')
        .service('dataService', DataService);
})();
