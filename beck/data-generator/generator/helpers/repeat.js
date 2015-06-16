module.exports = function(min, max, options) {
    var context = this;
    var contextIsArray = false;
    var count = 0;

    if (Array.isArray(min)) {
        options = max;
        context = min;
        count = context.length;
        contextIsArray = true;
    } else {
        if (arguments.length === 3) {
            count = randomInt(min, max);
        } else if (arguments.length === 2) {
            options = max;
            count = min;
        }
    }

    var ret = '';
    for (var i = 0; i < count; i++) {
        ret += options.fn(
            contextIsArray ? context[i] : context,
            {data: {index: i, count: count}}
        );
        ret = ret.trim();
        if (i < count - 1) ret += ',';
    }

    return ret;
};
