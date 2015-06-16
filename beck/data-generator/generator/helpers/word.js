var faker = require('faker');

module.exports = function() {
    var words = faker.lorem.words();
    return words[0];
};