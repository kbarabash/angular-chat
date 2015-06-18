var faker = require('faker');
var tools = require('../../../../../helpers/tools');

var Filter = function(filters) {
    this.getById = function(id) {
        for (var i = 0, l = this.getLength(); i < l; i++) {
            if (id === filters[i].id) {
                return filters[i];
            }
        }
        return null;
    };

    this.getLength = function() {
        return filters.length;
    };

    this.getData = function() {
        return filters;
    };
};

module.exports = function(config, dataFactory) {
    var randomValueFactory = tools.createRandomFactory(dataFactory);
    var randomIdFactory = tools.createRandomFactory(function() {
        return tools.randomInt(0, config.length * 100);
    });

    var result = [];
    for (var i = 0; i < config.length; i++) {
        result.push({
            id: randomIdFactory(),
            value: randomValueFactory()
        });
    }

    return new Filter(result);
};
