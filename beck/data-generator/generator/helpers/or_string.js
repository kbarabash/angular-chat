var tools = require('./tools');

module.exports = function() {
    if (1 === arguments.length) {
        return '';
    }

    var strings = [];
    for (var i = 0, l = arguments.length - 1; i < l; i++) {
        strings.push(tools.compileTemplate(arguments[i]));
    }

    var index = tools.randomInt(0, strings.length - 1);
    return strings[index];
};