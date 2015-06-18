var config = require('./config/config.json');

module.exports = function() {
    if (config.isDebug) {
        console.log.apply(null, arguments);
    }
};