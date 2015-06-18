var ItemsCollection = function(items) {
    this.getById = function(id) {
        for (var i = 0, l = this.getLength(); i < l; i++) {
            if (id === items[i].id) {
                return items[i];
            }
        }
        return null;
    };

    this.getByKey = function(key, value) {
        var data = [];
        for (var i = 0, l = this.getLength(); i < l; i++) {
            if (value === items[i][key]) {
                data.push(items[i]);
            }
        }
        return new ItemsCollection(data);
    };

    this.getData = function() {
        return items
    };

    this.getLength = function() {
        return items.length
    };
};

module.exports = function(length, createItem) {
    var items = [];
    for (var i = 0; i < length; i++) {
        items.push(createItem());
    }

    return new ItemsCollection(items);
};
