//Array.js
var ArrayKit = {

}

// 数组去重


// 

//Date.js

var DateKit = {
    dateFormat: function (date, format) {
        if (!date) date = new Date();
        else date = new Date(date);
        if (!format) format = 'yyyy-MM-dd';
        // 注意月份是 MM 分钟是mm
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


// dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');

//Form.js


//Http.js


var HttpKit_Judge = {

}
var HttpKit_Uri = {
    query2string/* query转字符串 */(...params) {
        params = params.reduce((total, item) => ({ ...total, ...item }), {})
        var querystring = '';
        if (params) {
            for (let key in params) {
                querystring += key + '=' + params[key];
                querystring += '&';
            }
            // 去除末尾&
            if (querystring.match(/&$/g)) querystring = querystring.slice(0, querystring.length - 1);
            return querystring;
        }
    },
    uri3query/* 合并uri以及query */(uri, ...params) {
        var querystring = this.query2string(...params);
        // 连接
        uri.indexOf('?') == -1 ? uri += '?' + querystring : uri += querystring;
        return uri;
    },
    // 如果空字符串查询指定为空的  推荐使用
    clear1void/* 清除无效的属性 undefined null 空字符串不在内 */(obj) {
        for (let key in obj) {
            let value = obj[key]
            if (value == undefined) delete obj[key];
        }
        return obj;
    },
    // 如果空字符串本是查询全部的 推荐使用  使用次数更多
    clear1allVoid/* 清除全部无效的属性 undefined null 空字符串包含在内 */(obj) {
        for (let key in obj) {
            let value = obj[key]
            if (value == undefined || value === '') delete obj[key];
        }
        return obj;
    },
    // 如果为0也需要清除  推荐使用这种 默认清除undefined以及null和空字符串
    clear1assignVoid/* 清除指定的属性 */(obj, assign = [], filter = 'clear1allVoid') {
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
    void2empty/* 转换undefined以及null */(value) {
        if (value == undefined) return '';
        else return value;
    },
    allVoid2empty/* 转换undefined以及null并 'undefined' 和 'null'*/(value) {
        if (value == undefined) return '';
        else if (value === 'undefined') return '';
        else if (value === 'null') return '';
        else return value;
    },
    allVoid2bar/* 没有意义的字符串以及null undefined转成横条 */(value) {
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
            // 保持原型  不然会转成对象
            o = obj.valueOf();
        }
        return o;
    }    
}

// 判断简单类型复杂类型是否相等




// 依赖方法
// 拷贝  既能拷贝数组又能拷贝对象
// Object.prototype.sCopy = function () {
//     var o;
//     if (Object.prototype.toString.call(this) === '[object Object]') {
//         o = {};
//         for (var key in this) {
//             o[key] = this[key].sCopy();
//         };
//     } else if (Object.prototype.toString.call(this) === '[object Array]') {
//         o = [];
//         for (var [i, v] of this.entries()) {
//             o[i] = this[i].sCopy();
//         }
//     } else {
//         // 保持原型  不然会转成对象
//         o = this.valueOf();
//     }
//     return o;
// };


