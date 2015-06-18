var CONFIG = require('./config.json');
var tools = require('./tools');

var ucfirst = function(str) {
    var f = str.toString().charAt(0).toUpperCase();
    return f + str.substr(1);
};

var routeListener = function(req, res) {
    tools.addCORSHeaders(res);

    var query = tools.getQueryFromReq(req);
    var data = tools.getGeneratedData();

    var isNotJSON = true;
    var filters = tools.getFiltersFromQuery(
        query, CONFIG.filters.filters, isNotJSON
    );

    var name = req.params.name.split('-');
    if (1 < name.length) {
        name = name[0] + ucfirst(name[1]);
    } else {
        name = req.params.name;
    }

    data = tools.getItemsByFilters(data[name], filters, function(filterValues, itemField) {
        for (var i = 0, l = filterValues.length; i <l; i++) {
            if (!filterValues[i]) {
                continue;
            }
            if (0 === itemField.toString().toLowerCase().indexOf(filterValues[i])) {
                return true;
            }
        }
        return false;
    });

    data = tools.generateContent(data, {
        pageSize: data.length,
        fromRow: 1,
        count: data.length
    });

    res.status(200)
        .send(JSON.stringify(data));
};

module.exports = {
    init: function(app) {
        app.get(CONFIG.filters.route, routeListener);
    }
};
