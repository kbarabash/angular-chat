var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var faker = require('faker');
var CONFIG = require('./config/config');
var helpers = require('./helpers');

faker.locale = CONFIG.faker.locale;

var rmDir = function(path, callback) {
    if (!fs.existsSync(path)) {
        callback && callback();
        return;
    }

    fs.readdirSync(path).forEach(function(file) {
        var curPath = path + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
            rmDir(curPath);
        } else {
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(path);

    callback && callback();
};

var configValidator = function(config) {
    if (!config.dest || !config.templates) {
        return false;
    }
    return fs.existsSync(config.templates);
};

var buildFile = function(path, encoding) {
    var fileData = fs.readFileSync(path, {
        encoding: encoding
    });

    var result = '';
    if (fileData) {
        helpers.load();
        result = handlebars.compile(fileData)();
    }

    return result;
};

var copy = function(from, to) {
    fs.createReadStream(from)
        .pipe(fs.createWriteStream(to));
};

var isCopy = function(file) {
    for (var i = 0, l = CONFIG.copy.length; i < l; i++) {
        if (-1 !== file.indexOf(CONFIG.copy[i])) {
            return true;
        }
    }
    return false;
};

var readDirAndBuild = function(options, callback) {
    if (!fs.existsSync(options.dest)) {
        fs.mkdirSync(options.dest);
    }

    fs.readdirSync(options.templates).forEach(function(file) {
        var curPath = options.templates + '/' + file;
        var destPath = options.dest + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) { //if dir
            fs.mkdirSync(destPath);
            readDirAndBuild({
                templates: curPath,
                dest: destPath,
                encoding: options.encoding
            });
        } else { //if file
            if (-1 !== curPath.indexOf(CONFIG.templatesExt.from)) { //if template
                var content = buildFile(curPath, options.encoding);
                var buildToPath = options.dest
                    + '/' + path.basename(file, CONFIG.templatesExt.from)
                    + CONFIG.templatesExt.to;
                fs.writeFileSync(buildToPath, content, {
                    encoding: options.encoding
                });
            } else if (isCopy(file)) { //if copy file
                copy(curPath, destPath);
            }
        }
    });

    callback && callback(false, true);
};

module.exports = function(config, callback) {
    if (!configValidator(config)) {
        return;
    }

    if (!config.encoding) {
        config.encoding = CONFIG.encoding;
    }

    if (fs.existsSync(config.dest)) {
        rmDir(config.dest, function startWork() {
            readDirAndBuild(config, callback)
        });
        return;
    }

    readDirAndBuild(config, callback);
};

