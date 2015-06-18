var path = require('path');
var CONFIG = require('./config/config.json');
var DataFactory = require('./generators/data-factory');
var templateBuilder = require('./templateBuilder/template-builder');

console.log('=== START ===');

var dataFactory = new DataFactory();
var data = dataFactory.getData();

for (var i = 0, l = CONFIG.length; i < l; i++) {
    templateBuilder.build(__dirname, CONFIG[i], data);
}

console.log('=== DONE ===');