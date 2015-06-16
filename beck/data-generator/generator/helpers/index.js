var CONFIG = require('./../config/config');
var handlebars = require('handlebars');

module.exports = {
    load: function helpers() {
        if (!CONFIG.helpers) {
            return;
        }

        CONFIG.helpers.forEach(function addHelper(item) {
            try {
                handlebars.registerHelper(item, require('./' + item));
            } catch (ex) {
            }
        });
    }
};