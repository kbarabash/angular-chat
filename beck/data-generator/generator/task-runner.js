var logger = require('./logger');

var TASKS_PATH = './tasks/';

module.exports = {
    run: function(tasks) {
        console.log('- Start tasks runner');
        if (!tasks) {
            return;
        }

        tasks.forEach(function(item) {
            logger('-- Run ' + item);
            try {
                require(TASKS_PATH + item);
            } catch (ex) {}
            logger('-- Finish ' + item);
        });

        console.log('- Stop tasks runner');
    }
};
