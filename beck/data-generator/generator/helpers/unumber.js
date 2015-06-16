var tools = require('./tools');

var uNumbers = {};

var getNumber = function(createNumFunc, key) {
    var number = createNumFunc();
    while (-1 !== uNumbers[key].indexOf(number)) {
        number = createNumFunc();
    }
    return number;
};

module.exports = function(min, max, key) {
    var isFloat = false;
    if (typeof min === 'string') {
        isFloat = true;
        min = tools.parseFloat(min);
        max = tools.parseFloat(max);
    }

    if (!uNumbers.hasOwnProperty(key)) {
        uNumbers[key] = [];
    }

    return getNumber( function() {
        if (isFloat) {
            return tools.randomFloat(min, max);
        }
        return tools.randomInt(min, max);
    });
};