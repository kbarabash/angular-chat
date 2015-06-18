var CONFIG = require('./config.json');
var url = require('url');

var generateContent = function(data, options) {
    return {
        rows: data,
        paginatedRowCount: options.pageSize,
        totalRowCount: options.count
    };
};

var getGeneratedData = function() {
    return require(CONFIG.dataPath);
};

var getDataByPage = function(data, options) {
    var startIndex = options.pageSize * (options.fromRow - 1);
    var lastIndex = options.pageSize + startIndex;
    return data.slice(startIndex, lastIndex);
};

var getFiltersFromQuery = function(query, filterList, isNotJSON) {
    var filters = {};
    Object.keys(filterList).forEach(function(filterName) {
        if (!query[filterName]) {
            return;
        }

        var values = [];
        if (isNotJSON) {
            values = [query[filterName]];
        } else {
            var filter = JSON.parse(query[filterName]);
            filter.forEach(function (filterData) {
                values.push(filterData);
            });
        }

        filters[filterName] = {
            values: values,
            name: filterList[filterName]
        };
    });

    return filters;
};

var addCORSHeaders = function(res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
};

var getQueryFromReq = function(req) {
    var parsedUrl = url.parse(req.originalUrl, true);
    return parsedUrl.query;
};

var isValidItemByFilters = function(item, filters, compare) {
    for (var key in filters) {
        if (!filters[key].values.length) {
            continue;
        }

        var itemFilterKey = filters[key].name;
        if (!item[itemFilterKey]) {
            return false;
        }

        if (!compare(filters[key].values, item[itemFilterKey])) {
            return false;
        }
    }
    return true;
};

var getItemsByFilters = function(data, filters, compare) {
    var items = [];
    data.forEach(function(item) {
        if (isValidItemByFilters(item, filters, compare)) {
            items.push(item);
        }
    });

    return items;
};

var generatePageInfo = function(query, defaultParams, count) {
    return {
        pageSize: parseInt(query.pageSize || defaultParams.pageSize),
        fromRow: parseInt(query.fromRow || defaultParams.fromRow),
        count: count
    };
};

module.exports = {
    generatePageInfo: generatePageInfo,
    getItemsByFilters: getItemsByFilters,
    getQueryFromReq: getQueryFromReq,
    getGeneratedData: getGeneratedData,
    addCORSHeaders: addCORSHeaders,
    generateContent: generateContent,
    getDataByPage: getDataByPage,
    getFiltersFromQuery: getFiltersFromQuery
};
