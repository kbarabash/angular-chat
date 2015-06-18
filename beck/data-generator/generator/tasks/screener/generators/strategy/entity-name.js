var filterGenerator = require('./tools/filter-generator');
var config = require('../config/config.json');
var tools = require('../../../../helpers/tools');
var faker = require('faker');

module.exports = function() {
    return filterGenerator(config.entityName, function() {
        return faker.company.companyName();
    });
};
