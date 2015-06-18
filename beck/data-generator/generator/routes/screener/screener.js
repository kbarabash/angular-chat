var CONFIG = require('./config.json');
var tools = require('./tools');
var filters = require('./filters');
var clone = require('clone');

var fixDataByFilters = function(data, filters) {
    var items = [];
    data.forEach(function(dataItem) {
        var item = clone(dataItem);
        Object.keys(filters).forEach(function(filterName) {
            var fieldName = filters[filterName];
            if (item[fieldName] && typeof item[fieldName] !== 'string') {
                item[fieldName] = item[fieldName].value;
            }
        });
        items.push(item);
    });
    return items;
};

var routeListener = function(req, res, type) {
    tools.addCORSHeaders(res);
    var query = tools.getQueryFromReq(req);
    var data = tools.getGeneratedData();
    var filters = tools.getFiltersFromQuery(query, CONFIG[type].filters);

    data = tools.getItemsByFilters(data[type], filters, function(filterValues, itemField) {
        var isCheckByValue = typeof itemField === 'string';
        var itemValue = isCheckByValue
                            ? itemField
                            : itemField.id;
        for (var i = 0, l = filterValues.length; i <l; i++) {
            var checkFilterValue = isCheckByValue
                                    ? filterValues[i].value
                                    : filterValues[i].id;

            if (checkFilterValue === itemValue) {
                return true;
            }
        }
        return false;
    });
    data = fixDataByFilters(data, CONFIG[type].filters);

    var pageInfo = tools.generatePageInfo(query, CONFIG[type].defaultQuery, data.length);
    data = tools.getDataByPage(data, pageInfo);
    data = tools.generateContent(data, pageInfo);

    res.status(200)
        .send(JSON.stringify(data));
};

module.exports = {
    init: function(app) {
        app.get(CONFIG.entities.route, function(req, res) {
            routeListener(req, res, 'entities');
        });
        app.get(CONFIG.tasks.route, function(req, res) {
            routeListener(req, res, 'tasks');
        });

        filters.init(app);
    }
};