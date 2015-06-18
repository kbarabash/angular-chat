var itemsGenerator = require('./tools/items-generator');
var config = require('../config/config.json');
var tools = require('../../../../helpers/tools');
var faker = require('faker');

module.exports = function(data) {
    var randomTaskName = tools.createRandomFactory(function() {
        return faker.lorem.sentence();
    });

    return itemsGenerator(config.tasks.length, function() {
        var entity = tools.getRandomItemFromArray(data.entities.getData());
        return {
            taskType: 'Add Client Account Agency Agreement',
            entityId: entity.entityId,
            trueLegalName:entity.trueLegalName,
            mei: tools.getRandomItemFromArray(data.mei.getData()),
            lei: tools.getRandomItemFromArray(data.lei.getData())
        };
    });
};