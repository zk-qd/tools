
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
