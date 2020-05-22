

var HttpKit_Judge = {

}
// correlation uri
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

window.HttpKit = {
    ...HttpKit_Judge,
    ...HttpKit_Uri,
}
