var CONFIG = require('./../config/config');
var handlebars = require('handlebars');
var logger = require('../logger');

module.exports = {
    load: function helpers() {
        if (!CONFIG.helpers) {
            return;
        }

        logger('- Start load helpers:');
        CONFIG.helpers.forEach(function addHelper(item) {
            logger('load: ' + item);
            try {
                handlebars.registerHelper(item, require('./' + item));
            } catch (ex) {}
        });
        logger('- End load helpers;');
    }
};