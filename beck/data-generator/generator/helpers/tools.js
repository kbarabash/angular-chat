var handlebars = require('handlebars');

Date.prototype.format=function(e){var t="";var n=Date.replaceChars;for(var r=0;r<e.length;r++){var i=e.charAt(r);if(r-1>=0&&e.charAt(r-1)=="\\"){t+=i}else if(n[i]){t+=n[i].call(this)}else if(i!="\\"){t+=i}}return t};Date.replaceChars={shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d:function(){return(this.getDate()<10?"0":"")+this.getDate()},D:function(){return Date.replaceChars.shortDays[this.getDay()]},j:function(){return this.getDate()},l:function(){return Date.replaceChars.longDays[this.getDay()]},N:function(){return this.getDay()+1},S:function(){return this.getDate()%10==1&&this.getDate()!=11?"st":this.getDate()%10==2&&this.getDate()!=12?"nd":this.getDate()%10==3&&this.getDate()!=13?"rd":"th"},w:function(){return this.getDay()},z:function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil((this-e)/864e5)},W:function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil(((this-e)/864e5+e.getDay()+1)/7)},F:function(){return Date.replaceChars.longMonths[this.getMonth()]},m:function(){return(this.getMonth()<9?"0":"")+(this.getMonth()+1)},M:function(){return Date.replaceChars.shortMonths[this.getMonth()]},n:function(){return this.getMonth()+1},t:function(){var e=new Date;return(new Date(e.getFullYear(),e.getMonth(),0)).getDate()},L:function(){var e=this.getFullYear();return e%400==0||e%100!=0&&e%4==0},o:function(){var e=new Date(this.valueOf());e.setDate(e.getDate()-(this.getDay()+6)%7+3);return e.getFullYear()},Y:function(){return this.getFullYear()},y:function(){return(""+this.getFullYear()).substr(2)},a:function(){return this.getHours()<12?"am":"pm"},A:function(){return this.getHours()<12?"AM":"PM"},B:function(){return Math.floor(((this.getUTCHours()+1)%24+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)*1e3/24)},g:function(){return this.getHours()%12||12},G:function(){return this.getHours()},h:function(){return((this.getHours()%12||12)<10?"0":"")+(this.getHours()%12||12)},H:function(){return(this.getHours()<10?"0":"")+this.getHours()},i:function(){return(this.getMinutes()<10?"0":"")+this.getMinutes()},s:function(){return(this.getSeconds()<10?"0":"")+this.getSeconds()},u:function(){var e=this.getMilliseconds();return(e<10?"00":e<100?"0":"")+e},e:function(){return"Not Yet Supported"},I:function(){var e=null;for(var t=0;t<12;++t){var n=new Date(this.getFullYear(),t,1);var r=n.getTimezoneOffset();if(e===null)e=r;else if(r<e){e=r;break}else if(r>e)break}return this.getTimezoneOffset()==e|0},O:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+"00"},P:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+":00"},T:function(){var e=this.getMonth();this.setMonth(0);var t=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,"$1");this.setMonth(e);return t},Z:function(){return-this.getTimezoneOffset()*60},c:function(){return this.format("Y-m-d\\TH:i:sP")},r:function(){return this.toString()},U:function(){return this.getTime()/1e3}};

var randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomFloat = function(min, max) {
    return Math.random() * (max - min) + min;
};

var zeroPad = function(num, len) {
    num = num + '';
    while (num.length < len) {
        num = '0' + num;
    }
    return num;
};

var isFunction = function(check) {
    return 'function' === typeof(check);
};

var isDate = function(check) {
    return check instanceof Date;
};

var isString = function(check) {
    return typeof check === 'string';
};

var compileTemplate = function(helperString) {
    return new handlebars.SafeString(
        handlebars.compile(helperString)()
    );
};


var createRandomFactory = function(dataFactory) {
    if (!isFunction(dataFactory)) {
        return function() {
            return '';
        };
    }

    var dataArray = [];
    var createData = function () {
        var data = '';
        do {
            data = dataFactory();
        } while (-1 !== dataArray.indexOf(data));

        dataArray.push(data);

        return data;
    };
    return createData;
};

var createGetRandomItemFromArrayFactory = function(data) {
    var usedData = [];
    var getRandomData = function() {
        if (data.length === usedData.length) {
            return null;
        }

        var neededData = '';
        do {
            neededData = data[randomInt(0, data.length - 1)];
        } while(-1 !== usedData.indexOf(neededData));
        usedData.push(neededData);

        return neededData;
    };

    return getRandomData;
};

var getRandomItemFromArray = function(arr) {
    return arr[randomInt(0, arr.length - 1)];
};

module.exports = {
    randomInt: randomInt,
    randomFloat: randomFloat,
    getRandomItemFromArray: getRandomItemFromArray,
    zeroPad: zeroPad,
    isFunction: isFunction,
    isString: isString,
    isDate: isDate,
    compileTemplate: compileTemplate,
    createRandomFactory: createRandomFactory,
    createGetRandomItemFromArrayFactory: createGetRandomItemFromArrayFactory
};