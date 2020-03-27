var HttpKit = {
    ...HttpKit_Judge,
    ...HttpKit_Uri,
}


var HttpKit_Judge = {

}

var HttpKit_Uri = {
    query2string/* query转字符串 */(params) {
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
    uri3query/* 合并uri以及query */(uri, params) {
        var querystring = query2string(params);
        // 连接
        uri.indexOf('?') == -1 ? uri += '?' + querystring : uri += querystring;
        return uri;
    },
    clear1void/* 清除无效的属性 undefined null 空字符串不在内 */(obj) {
        for (let key in obj) {
            let value = obj[key]
            if (value == undefined) delete obj[key];
        }
    },
    clear1allVoid/* 清除全部无效的属性 undefined null 空字符串包含在内 */(obj) {
        for (let key in obj) {
            let value = obj[key]
            if (value == undefined || value === '') delete obj[key];
        }
    }

}