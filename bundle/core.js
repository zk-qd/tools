//Array.js

var ArrayKit_Context = {


    dateSort(data) {
        return Object.keys(data).sort().map(item => data[item]);
    },
}


window.ArrayKit = {
    ...ArrayKit_Context,
}





//Date.js

var DateKit_Schema = {
    parseSerialDate(val) {
        return new Date(val.replace(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/, '$<year>/$<month>/$<day>'));
    }
}
window.DateKit = {
    ...DateKit_Schema,
    dateFormat: function (date, format) {

        if (!date) date = new Date();
        else if (date.length == 8) date = this.parseSerialDate(date);
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
    }
}
console.log(DateKit.dateFormat('20200401', 'yyyy-MM-dd hh:mm:ss'));
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
//Form.js
// operation
var FormKit_Operation = {

    getForm({ formSel, prefix } = ErrorKit.emptyParameterException()) {
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

    setForm({ formSel, prefix, params } = ErrorKit.emptyParameterException()) {

        const form = document.querySelector(formSel);
        if (!form) return FormKit_Message['form-notExist'];

        let ele;
        for (var key in params) {
            if (prefix) ele = form.querySelector('[name=' + prefix + key + ']');
            else ele = form.querySelector('[name=' + key + ']');
            if (ele) ele.value = params[key];
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
    }, debounce: function (handle, delay = 400) {
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
    debounce(handler, delay, immediate) {
        let timer = null,
            cancle;

        return function (...args) {
            return new Promise((resolve, reject) => {
                let content = this;
                if (timer) clearTimeout(timer);
                if (cancle) clearTimeout(timer);

                if (immediate) {
                    handler.apply(content, args).then((res) => {
                        resolve(res);
                    });
                    immediate = false;
                }
                setTimeout(() => {
                    handler.apply(content, args).then((res) => {
                        resolve(res);
                    });
                }, delay);
                cancle = () => {

                    reject("请勿频繁操作");
                };
            });
        }
    },

    throttle: function (handle, delay = 500) {
        let timer = null,

            startTime = Date.parse(new Date()),

            curTime,

            remaining,
            context;
        return function (...args) {
            curTime = Date.parse(new Date());
            remaining = delay - (curTime - startTime);
            context = this;
            clearTimeout(timer);
            if (remaining <= 0) {
                handle.apply(context, args);
                startTime = Date.parse(new Date());
            } else
                timer = setTimeout(handle, remaining);
        }
    }
}





