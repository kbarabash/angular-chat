var dataStruct = require('./data-struct');

module.exports = {
    build: function(root, config, data) {
        dataStruct(root, config, data);
    }
};
