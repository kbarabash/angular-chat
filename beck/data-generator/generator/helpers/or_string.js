var faker = require('./faker');
var tools = require('./tools');

module.exports = function(strings, fakePath) {
    strings = strings.split(';');
    if (tools.isString(fakePath)) {
        strings.push(faker(fakePath));
    }

    var index = tools.randomInt(0, strings.length - 1);
    return strings[index]
};