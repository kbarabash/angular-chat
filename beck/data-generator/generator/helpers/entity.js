var config = require('../config/helpers/entity.json');
var tools = require('./tools');

var entitiesStorage = {};

var getEntityConfig = function(name) {
    if (!name && !config[name] && !config[name].count) {
        return null;
    }

    return config[name];
};

var isValidRange = function(from, entityConfig) {
    if (0 > from || from >= entityConfig.count) {
        return false;
    }

    return true;
};

var createString = function(string) {
    var value = '';
    try {
        value = tools.compileTemplate(string);
    } catch (ex) {}
    return value;
};


var createEntitiesData = function(string, options) {
    var data = [];
    for (var i = 0, l = options.count; i < l; i++) {
        var value = createString(string);
        if (options.isUnique) {
            while (-1 !== data.indexOf(value)) {
                value = createString(string);
            }
        }

        data.push(value);
    }
    return data;
};

//{{entity 0 49 "{{faker 'lorem.sentence'}} text "}}
module.exports = function(name, from, string) {
    var options = arguments[arguments.length - 1];

    var isRandom = 2 === arguments.length;
    if (isRandom) {
        string = from;
    }

    if (!string) {
        return '';
    }

    var entityConfig = getEntityConfig(name);
    if (!entityConfig) {
        return '';
    }

    if (!isRandom && !isValidRange(from, entityConfig)) {
        return '';
    }


    if (!entitiesStorage[name]) {
        entitiesStorage[name] = createEntitiesData(string, entityConfig);
    }

    if (isRandom) {
        var index = tools.randomInt(0, entitiesStorage[name].length - 1);
        return entitiesStorage[name][index];
    }

    //get real index
    var realIndex = options.data.index + from;
    if (realIndex >= entitiesStorage[name].length) {
        return '';
    }

    return entitiesStorage[name][realIndex];
};
