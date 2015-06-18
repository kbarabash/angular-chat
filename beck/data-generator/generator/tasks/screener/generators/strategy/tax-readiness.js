var filterGenerator = require('./tools/filter-generator');
var config = require('../config/config.json');
var tools = require('../../../../helpers/tools');
var faker = require('faker');

module.exports = function() {
    return filterGenerator(config.taxReadiness, function() {
        return faker.lorem.words()[tools.randomInt(0, 2)]
                    + ' ' + tools.randomInt(0, 1000);
    });
};
