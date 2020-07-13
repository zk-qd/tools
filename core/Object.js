<<<<<<< HEAD
window.ObjectKit = {
=======
var ObjectKit = { 
>>>>>>> 8f5751d6a52ab8c386690a8adb74e123b2212926
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
            // 保持原型  不然会转成对象
            o = obj.valueOf();
        }
        return o;
    },
    /**
     * @param {Function} handle
     * @param {Number} delay
     */
    debounce: function(handle, delay = 400) /* 防抖动 */ {
        let timer = null;
        return function (...args) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                handle.apply(this, args);
                timer = null
            }, delay)
        }
    },
    throttle: function(handle, delay = 500) /* 节流阀 */ {
        let timer = null,
            // 初始化一个开始时间
            startTime = Date.parse(new Date()),
            // 触发时间
            curTime,
            // 计算剩余时间
            remaining,
            context;
        return function (...args) /* 以上三句代码只会被执行一次 每次触发事件执行的是return回去的函数 */ {
            curTime = Date.parse(new Date());
            remaining = delay - (curTime - startTime);
            context = this;
            clearTimeout(timer);
            if (remaining <= 0) { // 上一个周期内已经完了
                handle.apply(context, args);
                startTime = Date.parse(new Date());
            } else {// 还在同一个周期内
                timer = setTimeout(handle, remaining);
            }
        }
    }
}

// 判断简单类型复杂类型是否相等


