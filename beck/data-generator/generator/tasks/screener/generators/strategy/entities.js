var itemsGenerator = require('./tools/items-generator');
var config = require('../config/config.json');
var tools = require('../../../../helpers/tools');

module.exports = function(filters) {
    var getRandomName = tools.createGetRandomItemFromArrayFactory(filters.entityName.getData());
    var randomIdFactory = tools.createRandomFactory(function() {
        return tools.randomInt(0, config.entities.length * 1000);
    });
    
    return itemsGenerator(config.entities.length, function() {
        return {
            entityId: randomIdFactory(),
            trueLegalName: getRandomName().value,
            mei: tools.getRandomItemFromArray(filters.mei.getData()),
            entityType: tools.getRandomItemFromArray(filters.entityType.getData()),
            taxReadinessStatus: tools.getRandomItemFromArray(filters.taxReadiness.getData()),
            lei: tools.getRandomItemFromArray(filters.lei.getData())
        };
    });
};