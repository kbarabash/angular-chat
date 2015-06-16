var tools = require('./tools');

module.exports = function(min, max, options) {
    if (arguments.length === 2) {
        options = max;
        max = min;
        min = 0;
    }

    var isFloat = false;
    if (typeof min === 'string') {
        isFloat = true;
        min = tools.parseFloat(min);
        max = tools.parseFloat(max);
    }

    if (isFloat) {
        return tools.randomFloat(min, max);
    }
    var n = tools.randomInt(min, max);
    return options.hash.pad ? tools.zeroPad(n, max.toString().length) : n;
};