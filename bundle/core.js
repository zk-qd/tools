//Array.js

var ArrayKit_Context = {
    dateSort(data) {
        return Object.keys(data).sort().map(item => data[item]);
    },
}


var ArrayKit = {
    ...ArrayKit_Context,
}



//Date.js


var DateKit = {
    dateFormat:function (date, format) {
        if (!date) date = new Date();
        else date = new Date(date);
        if (!format) format = 'yyyy-MM-dd';
       
        const list = [
            { match: 'yyyy', val: date.getFullYear() },
            { match: 'MM', val: (date.getMonth() + 1 + '').padStart(2, '0') },
            { match: 'dd', val: date.getDay().toString().padStart(2, '0') },
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
//Form.js
// operation
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
    }
}

var FormKit_verify = {

}
var FormKit_Message = {
    ['form-notExist']: 'The form doesn\'t exist',
}


var FormKit = {
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

var HttpKit = {
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

var JudgeKit = {
    ...JudgeKit_Judge,
}


//Math.js

//Object.js
var ObjectKit = {
    deepCopy: function (obj) {
        var o;
        if (Object.prototype.toString.call(obj) === '[object Object]') {
            o = {};
            for (var key in obj) {
                o[key] = this.sCopy(obj[key]);
            };
        } else if (Object.prototype.toString.call(obj) === '[object Array]') {
            o = [];
            for (var [i, v] of obj.entries()) {
                o[i] = this.sCopy(obj[i]);
            }
        } else {
           
            o = obj.valueOf();
        }
        return o;
    }    
}




