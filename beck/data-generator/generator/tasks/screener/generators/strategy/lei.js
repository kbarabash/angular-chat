var filterGenerator = require('./tools/filter-generator');
var config = require('../config/config.json');
var tools = require('../../../../helpers/tools');
var faker = require('faker');

module.exports = function() {
    return filterGenerator(config.lei, function() {
        return tools.randomInt(798798798, 798798798 * config.lei.length);
    });
};
