//Array.js

var ArrayKit_Context = {
    dateSort(data) {
        return Object.keys(data).sort().map(item => data[item]);
    },assignSort: function (target, sortby, assign) {
        const arr = [], copyTarget = JSON.parse(JSON.stringify(target));
        assign.forEach((assignItem, assignIndex) => {
            let cindex = copyTarget.findIndex(citem => sortby(citem, assignItem));
            if (cindex !== -1) {
                arr[assignIndex] = JSON.parse(JSON.stringify(copyTarget[cindex]));
                copyTarget.splice(cindex, 1);
            };
        })
        return arr;
    },sort(target, type = 'up', key) {
        target.sort((value1, value2) => {
            if (type == 'down') [value2, value1] = [value1, value2]
            if (key) {
                return value1[key].toString().localeCompare(value2[key].toString());
            } else {
                return value1.localeCompare(value2);
            }
        });
    },


}


window.ArrayKit = {
    ...ArrayKit_Context,
}

//Date.js

const DateKit_Schema = {
    parseSerialDate(val) {
        return new Date(val.replace(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/, '$<year>/$<month>/$<day>'));
    }
}
const DateKit = {
    ...DateKit_Schema,
    dateFormat:function (date, format) {

        if (!date) date = new Date();
        else if (date.toString().length == 8) date = this.parseSerialDate(date);
        else date = new Date(date);
        if (!format) format = 'yyyy-MM-dd';
        const list = [
            { match: 'yyyy', val: date.getFullYear() },
            { match: 'MM', val: (date.getMonth() + 1 + '').padStart(2, '0') },
            { match: 'dd', val: date.getDate().toString().padStart(2, '0') },
            { match: 'hh', val: date.getHours().toString().padStart(2, '0') },
            { match: 'mm', val: date.getMinutes().toString().padStart(2, '0') },
            { match: 'ss', val: date.getSeconds().toString().padStart(2, '0') },
        ]

        for (let i = 0, length = list.length; i < length; i++) {
            const item = list[i];
            const reg = new RegExp(item.match);
            format = format.replace(reg, item.val);
        }
        return format;

    },format: function (date, format = 'yyyy-MM-dd', dt = true) {
        if (!date && dt) date = new Date();
        else if (!date && !dt) return '';

        else if (date.toString().length == 8) date = this.parseSerialDate(date);
        else date = new Date(date);
        const list = [
            { match: 'yyyy', val: date.getFullYear() },
            { match: 'MM', val: fillZore(date.getMonth() + 1) },
            { match: 'M', val: date.getMonth() + 1 },
            { match: 'dd', val: fillZore(date.getDate().toString()) },
            { match: 'd', val: date.getDate().toString() },
            { match: 'HH', val: fillZore(date.getHours().toString()) },
            { match: 'H', val: date.getHours().toString() },
            { match: 'hh', val: fillZore(hour12()) },
            { match: 'h', val: hour12() },
            { match: 'mm', val: fillZore(date.getMinutes().toString()) },
            { match: 'm', val: date.getMinutes().toString() },
            { match: 'ss', val: fillZore(date.getSeconds().toString()) },
            { match: 's', val: date.getSeconds().toString() },
            { match: 'WW', val: fillZore(week().toString()) },
            { match: 'W', val: week().toString() },
            { match: 'A', val: apm('Upper') },
            { match: 'a', val: apm('Lower') },
            { match: 'timestamp', val: date.getTime() },
        ]
        for (let i = 0, length = list.length; i < length; i++) {
            const item = list[i];
            const reg = new RegExp(item.match);
            format = format.replace(reg, item.val);
        }
        return format;
        function hour12() {
            let hour = date.getHours();
            hour = hour > 12 ? hour - 12 : hour;
            return hour.toString();
        }
        function apm(cases) {
            let hour = date.getHours(),
                temp = hour > 12 ? 'pm' : 'am';
            return temp['to' + cases + 'Case']()
        }
        function week() {
            let w = date.getDay();
            return w == 0 ? 7 : w;
        }
        function fillZore(value) {
            return value.toString().padStart(2, '0')
        }
    },dayOfMonth:function (date) {
        if (date) {
            date = new Date(date);
        } else {
            date = new Date();
        }
        let year = date.getFullYear(),
            month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    },



    prevMonth:function (date) {
        if (date) date = new Date(date);
        else date = new Date();
        let month = date.getMonth(),
            year = date.getFullYear();
        return new Date(year, month - 1, 1);
    },
    currentMonth:function () {
        return new Date();
    },
    nextMonth:function (date) {
        if (date) date = new Date(date);
        else date = new Date();
        let month = date.getMonth(),
            year = date.getFullYear();
        return new Date(year, month + 1, 1);
    },
    timeAndDate:function (time, date) {
        if (time) time = new Date(time);
        else time = new Date();
        if (date) date = new Date(date);
        else date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
    },intervalOfDate: function (type, date) {
        if (date) date = new Date(date);
        else date = new Date();
        let year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();
        switch (type) {
            case 'year':
                return {
                    begin: new Date(year, 0, 1),
                    end: new Date(year, 11),
                };
            case 'month':
                return {
                    begin: new Date(year, month),
                    end: new Date(year, month + 1, 0),
                };
            case 'day':
                return {
                    begin: new Date(year, month, day, 0, 0, 0),
                    end: new Date(year, month, day, 23, 59, 59),
                };
            case 'hour':
                return {
                    begin: new Date(year, month, day, hour, 0, 0),
                    end: new Date(year, month, day, hour, 59, 59),
                };
            case 'minute':
                return {
                    begin: new Date(year, month, day, hour, minute, 0),
                    end: new Date(year, month, day, hour, minute, 59),
                };
        }
    },distanceDate: function (day = 0, h = new Date().getHours()) {
        let current = new Date(),
            date = new Date(current.getFullYear(), current.getMonth(), current.getDate(), h);
        return new Date(date.getTime() + 24 * 3600 * 1000 * day)
    },get24Hour() {
        return '.'.repeat(23).split('.').map((item, index) => index.toString().padStart(2, '0') + ':00')
    },get48Hour() {
        return DateKit.get24Hour().map(item => [item, item.replace(/:00/, ':30')]).flat(1);
    },get30Date(date, format = 'yyyy-MM-dd') {
        let { end } = DateKit.intervalOfDate('month', date),
            year = end.getFullYear(),
            month = end.getMonth();
        return '.'.repeat(end.getDate() - 1).split('.').map((item, index) => {
            return DateKit.format(new Date(year, month, index + 1), format)
        })

    },get12Month(date, format = "yyyy-MM") {
        let year;
        date = date ? new Date(date) : new Date();
        year = date.getFullYear();
        return '.'.repeat(11).split('.').map((item, index) => {
            return DateKit.format(new Date(year, index), format);
        })
    }

}
window.DateKit = DateKit;
console.log(DateKit.dateFormat('20200401', 'yyyy-MM-dd hh:mm:ss'));
console.log(DateKit.dayOfMonth())
console.log(DateKit.prevMonth())
//Dom.js
window.DomKit = {
    copyText(dom) {
        return new Promise((resolve, reject) => {
            try {
                if (document.body.createTextRange) {
                    let range = document.body.createTextRange();
                    range.moveToElementText(dom);
                    range.select();
                } else if (window.getSelection) {
                    let selection = window.getSelection();
                    let range = document.createRange();
                    range.selectNodeContents(dom);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
                document.execCommand("copy");
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }
}
//Encrypt.js


window.EncryptKit = {idNum(val) {
        if (!val) return val;
        return val.toString().replace(/(\d{3})\d{11}(\d{4}|\d{3}[A-Z]{1})/, "$1" + "*".repeat(11) + "$2");
    }
}
//Form.js

var FormKit_Operation = {
    getForm({ formSel, prefix } =ErrorKit.emptyParameterException()) {
        var form = document.querySelector(formSel);
        if (!form) return FormKit_Message['form-notExist'];
        var data = form.serializeArray();
        if (prefix) {
            data = data.reduce((total, item) => {
                total[item.name.substr(1, item.name.length)] = item.value;
                return total;
            }, {});
        } else {
            data = data.reduce((total, item) => {
                total[item.name] = item.value;
                return total;
            }, {});
        }
        return data;
    },
    setForm({ formSel, prefix, params } =ErrorKit.emptyParameterException()) {
        const form = document.querySelector(formSel);
        if (!form) return FormKit_Message['form-notExist'];
        let ele;
        for (var key in params) {
            if (prefix) ele = form.querySelector('[name=' + prefix + key + ']');
            else ele = form.querySelector('[name=' + key + ']');
            if (ele) ele.value = params[key];
        }
    },toFormData(data) {
        let type = Object.prototype.toString.call(data);
        switch (type) {
            case "[object Object]":
                return Object.entries(data).reduce((t, v) => {
                    Reflect.apply(t.append, t, v);
                    return t;
                }, new FormData());
            case "[object Array]":
                return Object.entries(data).reduce((t, v) => {
                    Reflect.apply(t.append, t, v);
                    return t;
                }, new FormData());
        }
    }

}
var FormKit_Verify = {

}
var FormKit_Message = {
    ['form-notExist']: 'The form doesn\'t exist',
}


window.FormKit = {
    ...FormKit_Message,
    ...FormKit_Verify,
    ...FormKit_Operation,
};
//Http.js


var HttpKit_Judge = {

}
var HttpKit_Uri = {
    query2string(...params) {
        params = params.reduce((total, item) => ({ ...total, ...item }), {})
        var querystring = '';
        if (params) {
            for (let key in params) {
                querystring += key + '=' + params[key];
                querystring += '&';
            }
            if (querystring.match(/&$/g)) querystring = querystring.slice(0, querystring.length - 1);
            return querystring;
        }
    },
    uri3query(uri, ...params) {
        var querystring = this.query2string(...params);
        uri.indexOf('?') == -1 ? uri += '?' + querystring : uri += querystring;
        return uri;
    },
    clear1void(obj) {
        for (let key in obj) {
            let value = obj[key]
            if (value == undefined) delete obj[key];
        }
        return obj;
    },
    clear1allVoid(obj) {
        for (let key in obj) {
            let value = obj[key]
            if (value == undefined || value === '') delete obj[key];
        }
        return obj;
    },
    clear1assignVoid(obj, assign = [], filter = 'clear1allVoid') {
        obj = this[filter](obj);
        for (let key in obj) {
            var value = obj[key];
            assign.forEach(item => {
                if (value === item) delete obj[key];
            });
        }
        return obj;
    }
}

window.HttpKit = {
    ...HttpKit_Judge,
    ...HttpKit_Uri,
}

//Judge.js

var JudgeKit_Judge = {
    void2empty(value) {
        if (value == undefined) return '';
        else return value;
    },
    allVoid2empty(value) {
        if (value == undefined) return '';
        else if (value === 'undefined') return '';
        else if (value === 'null') return '';
        else return value;
    },
    allVoid2bar(value) {
        var value = this.allVoid2empty(value)
        if (value === '') return '-';
        else return value;
    },
}

window.JudgeKit = {
    ...JudgeKit_Judge,
}


//Math.js




var MathKit_Compute = {
    add(arg1, arg2) {
        let r1, r2, m;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },
    subtract(arg1, arg2) {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = r1 >= r2 ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(2);
    },
    multiply(arg1, arg2) {
        let m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) { }
        try {
            m += s2.split('.')[1].length;
        } catch (e) { }
        return (
            (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
            Math.pow(10, m)
        );
    },
    divide(arg1, arg2) {
        let t1 = 0,
            t2 = 0,
            r1,
            r2;
        try {
            t1 = arg1.toString().split('.')[1].length;
        } catch (e) { }
        try {
            t2 = arg2.toString().split('.')[1].length;
        } catch (e) { }
        r1 = Number(arg1.toString().replace('.', ''));
        r2 = Number(arg2.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    randomCoding(n) {
        let database = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            text = [];
        database.push(...database.map(item => item.toLowerCase()));
        for (var i = 0; i < n; i++) {
            text.push(database[Math.floor(Math.random() * 48)]);
        }
        return text.join('');
    },
    rgbtohex(rgb) {
        let { r, g, b } = rgb.match(/rgb\(\s*(?<r>\d*),\s*(?<g>\d*),\s*(?<b>\d*)\)/).groups;
        r = Number(r).toString(16).padStart(2, 0);
        g = Number(g).toString(16).padStart(2, 0);
        b = Number(b).toString(16).padStart(2, 0);
        return '#' + r + g + b;
    },
    hextorgb(hex) {
        if (hex.length == 4 || hex.length == 7) {
            let len = (hex.length - 1) / 3;
            return 'rgb(' + hex.replace(/#/, '').match(new RegExp(`[0-9A-z]{${len}}`, 'g'))
                .map(item => parseInt(item.repeat(len == 1 ? 2 : 1), 16)).reduce((t, v, i) => {
                    return t + ',' + v
                }) + ')';
        } else {
            throw new TypeError('hex type error! ' + hex)
        }
    }
}

window.MathKit = {
    ...MathKit_Compute,
}

//Object.js
window.ObjectKit = {
    deepCopy: function (obj) {
        var o;
        if (Object.prototype.toString.call(obj) === '[object Object]') {
            o = {};
            for (var key in obj) {
                o[key] = this.deepCopy(obj[key]);
            };
        } else if (Object.prototype.toString.call(obj) === '[object Array]') {
            o = [];
            for (var [i, v] of obj.entries()) {
                o[i] = this.deepCopy(obj[i]);
            }
        } else {
            o = obj.valueOf();
        }
        return o;
    },debounce: function (handle, delay = 400){
        let timer = null,
            cancel = null;
        return async function (...args) {
            return new Promise((resolve, reject) => {
                if (timer) clearTimeout(timer)
                if (cancel) cancel();
                timer = setTimeout(() => {
                    resolve(handle.apply(this, args));
                    timer = null
                }, delay)
                cancel = () => {
                    reject()
                }
            }).catch((err) => {
                console.log("请勿频繁操作")
            })
        }
    },
    debounce(handler, delay = 400, immediate = true) {
        let timer = null,
            cancle;
        return function (...args) {
            return new Promise((resolve, reject) => {
                let content = this;
                if (timer) clearTimeout(timer);
                if (cancle) cancle(timer);
                if (immediate) {
                    execute();
                    immediate = false;
                } else {
                    timer = setTimeout(() => {
                        execute();
                    }, delay);
                }
                cancle = () => {
                    reject("请勿频繁操作");
                };
                function execute() {
                    let returned = handler.apply(content, args);
                    if (Promise[Symbol.hasInstance](returned)) {
                        returned.then((res) => {
                            resolve(res);
                        });
                    } else {
                        resolve(returned)
                    }
                }
            });
        }
    },

    throttle: function (handle, delay = 500, immediate = true){
        let timer = null,
            startTime = Date.parse(new Date()),
            curTime,
            remaining,
            context;
        return function (...args){
            curTime = Date.parse(new Date());
            remaining = delay - (curTime - startTime);
            context = this;
            clearTimeout(timer);
            if (immediate) {
                execute();
                immediate = false;
            } else {
                if (remaining <= 0) {
                    execute();
                } else {
                    timer = setTimeout(handle, remaining);
                }
            }
            function execute() {
                handle.apply(context, args);
                startTime = Date.parse(new Date());
            }
        }
    },Observer: function () {
        const list = {};
        this.on = function (type, fn) {
            !list[type] && (list[type] = new Set());
            list[type].add(fn)
            return this;
        }
        this.emit = function (type, args, async = true) {
            let event = { type: type, params: args }
            run(() => { list[type] && list[type].forEach(fn => fn.call(undefined, event)) });
            function run(callback) {
                if (async) setTimeout(callback);
                else callback();
            }
            return this;
        }
        this.off = function (type, fn) {
            if (type) {
                list[type] && (fn ? list[type].delete(fn) : delete list[type])
            } else {
                list = {};
            }
            return this
        }
    },StateModel: function (states) {
        if (new.target !== ObjectKit.StateModel) { return new ObjectKit.StateModel(states) }
        let currentState = {};
        let constrol = {
            change(...args) {
                let i = 0, len = args.length;
                currentState = {};
                for (; i < len; i++) {
                    currentState[args[i]] = true;
                }
                return this;
            },
            run() {
                for (let key in currentState) {
                    states[key] && states[key]();
                }
                return this;
            }

        }
        return constrol;

    },CommandModel: function (command = {}) {
        if (new.target !== ObjectKit.CommandModel) return new ObjectKit.CommandModel(command);
        return {execute(args) {
                if (Object.prototype.toString.call(args) === '[object Array]') {
                    args.forEach(this.execute)
                }
                let cmd = args['cmd'],
                    params = args['params'] || [];
                if (!(params instanceof Array)) {
                    params = [params];
                }
                return command && command[cmd] && command[cmd](...params);
            }
        }
    },Flyweight: function (logic = {}) {
        if (new.target !== ObjectKit.Flyweight) return new ObjectKit.Flyweight(logic);
        return {call(args) {
                if (Object.prototype.toString.call(args) === '[object Array]') {
                    args.forEach(this.call)
                }
                let share = args['share'],
                    params = args['params'] || [];
                return logic && logic[share] && logic[share](...params);
            },add(obj) {
                logic = { ...logic, ...obj };
                return this;
            }
        }
    },MemoModel: function () {
        if (new.target !== ObjectKit.MemoModel) return new ObjectKit.MemoModel();
        this.cache = new Map();
        this.add = function (key, value) {
            this.cache.set(key, value);
        }
        this.get = function (key) {
            return this.cache.get(key);
        }
        this.has = function (key) {
            return this.cache.has(key);
        }
    },afterPerform(callback, condition = function () { return true }, delay = 400) {
        if (condition()) {
            callback();
        } else {
            setTimeout(() => {
                ObjectKit.afterPerform(callback, condition, delay)
            }, delay)
        }
    }
}




