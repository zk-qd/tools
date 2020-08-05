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
            // 保持原型  不然会转成对象
            o = obj.valueOf();
        }
        return o;
    },
    /**
     * @param {Function} handle
     * @param {Number} delay
     * @returns {Promise}
     * 使用promise可能有点问题,已优化
     */
    debounce: function (handle, delay = 400) /* 防抖动 */ {
        let timer = null,
            // 取消promise
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
        // 这里不要用箭头函数
        return function (...args) {
            return new Promise((resolve, reject) => {
                let content = this;
                if (timer) clearTimeout(timer);
                if (cancle) cancle(timer);
                // 如果immediate参数为true 那么第一次是立即请求，后面立即改为延迟请求
                if (immediate) {
                    execute();
                    immediate = false;
                }
                setTimeout(() => {
                    execute();
                }, delay);
                cancle = () => {
                    // 只有请求到了结果才算成功，再次之前任何下一次请求，都会取消上次请求
                    reject("请勿频繁操作");
                };
                function execute() {
                    // 判断是否为promise函数
                    if (Promise[Symbol.hasInstance](handler)) {
                        handler.apply(content, args).then((res) => {
                            resolve(res);
                        });
                    } else {
                        // 如果不是promise函数
                        resolve(handler.apply(content, args))
                    }
                }
            });
        }
    },

    throttle: function (handle, delay = 500) /* 节流阀 */ {
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


