
const DateKit_Schema = {
    parseSerialDate(val) {
        return new Date(val.replace(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/, '$<year>/$<month>/$<day>'));
    }
}
const DateKit = {
    ...DateKit_Schema,
    dateFormat:/* data format v1.0 */ function (date, format) {

        if (!date) date = new Date();
        else if (date.toString().length == 8) date = this.parseSerialDate(date);
        else date = new Date(date);
        if (!format) format = 'yyyy-MM-dd';
        // 注意月份是 MM 分钟是mm
        const list = [
            // 年
            { match: 'yyyy', val: date.getFullYear() },
            // 月
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

    },
    /**
     * 格式化时间 v1.1
     * @param {Any} date 任意能够转时间的数据
     * @param {String} format 模板格式
     * @param {Boolean} dt 是否存在默认时间 
     * @return {String} 时间 
     *  */

    format: function (date, format = 'yyyy-MM-dd', dt = true) {
        if (!date && dt) date = new Date();
        else if (!date && !dt) return '';

        else if (date.toString().length == 8) date = this.parseSerialDate(date); // 20201010 格式
        else date = new Date(date);
        // 注意月份是 MM 分钟是mm ，只有h和a既有大写又有小写，单个字母不补零
        const list = [
            { match: 'yyyy', val: date.getFullYear() }, // 年份
            { match: 'MM', val: fillZore(date.getMonth() + 1) }, // 月份 补零
            { match: 'M', val: date.getMonth() + 1 }, // 月份 不补零
            { match: 'dd', val: fillZore(date.getDate().toString()) }, // 天 补零
            { match: 'd', val: date.getDate().toString() }, // 天 不补零
            { match: 'HH', val: fillZore(date.getHours().toString()) }, // 小时 24制 补零
            { match: 'H', val: date.getHours().toString() }, // 小时 24制 不补零
            { match: 'hh', val: fillZore(hour12()) }, // 小时 12制 补零
            { match: 'h', val: hour12() }, // 小时 12制 不补零
            { match: 'mm', val: fillZore(date.getMinutes().toString()) }, // 分钟 补零
            { match: 'm', val: date.getMinutes().toString() }, // 分钟 不补零
            { match: 'ss', val: fillZore(date.getSeconds().toString()) }, // 秒 补零
            { match: 's', val: date.getSeconds().toString() }, // 秒 不补零
            { match: 'WW', val: fillZore(week().toString()) }, // AM or PM
            { match: 'W', val: week().toString() }, // am or pm
            { match: 'A', val: apm('Upper') }, // AM or PM
            { match: 'a', val: apm('Lower') }, // am or pm
            { match: 'timestamp', val: date.getTime() }, // am or pm
        ]
        for (let i = 0, length = list.length; i < length; i++) {
            const item = list[i];
            const reg = new RegExp(item.match);
            format = format.replace(reg, item.val);
        }
        return format;
        // 24小时转12小时制
        function hour12() {
            let hour = date.getHours();
            hour = hour > 12 ? hour - 12 : hour;
            return hour.toString();
        }
        // 判断上午还是下午
        function apm(cases) {
            let hour = date.getHours(),
                temp = hour > 12 ? 'pm' : 'am';
            return temp['to' + cases + 'Case']()
        }
        // 周 1234560 => 1234567
        function week() {
            let w = date.getDay();
            return w == 0 ? 7 : w;
        }
        // 补零
        function fillZore(value) {
            return value.toString().padStart(2, '0')
        }
    },
    /**
     * @param {Any} date 传入时间 格式可以被new Date转化就行了
     * @returns {Number} 返回的是一个月的天数
     */
    dayOfMonth:  /* 获取一个月的天数 */function (date) {
        if (date) {
            date = new Date(date);
        } else {
            //   没有传入时间 那么就是当前时间
            date = new Date();
        }
        let year = date.getFullYear(),
            month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    },



    prevMonth: /* 获取上个月的Date对象 */function (date) {
        if (date) date = new Date(date);
        else date = new Date();
        let month = date.getMonth(),
            year = date.getFullYear();
        return new Date(year, month - 1, 1);
    },
    currentMonth: /* 获取当前月份的Date对象 */function () {
        return new Date();
    },
    nextMonth: /* 获取下一个月的Date对象 */ function (date) {
        if (date) date = new Date(date);
        else date = new Date();
        let month = date.getMonth(),
            year = date.getFullYear();
        return new Date(year, month + 1, 1);
    },
    timeAndDate: /* 通过时间和日期组合成date对象 */ function (time, date) {
        if (time) time = new Date(time);
        else time = new Date();
        if (date) date = new Date(date);
        else date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
    },
    /**
     * *根据某分,某小时，某日，某月，某年获取时间段 
     * @param {String} type minute,hour,day，month，year
     * @param {Any} date 
     * @returns {Object} {begin: new Date,end: new Date} 
     * todo 返回的是两个时间段
     * */
    intervalOfDate: function (type, date) {
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
    },
    /**
     * 距离当天的时间
     * @param {Number} day 距离当天多少天
     * @todo day的值可为正负  为正则获取 未来日期  为负则获取 过去日期
     * @param {Number} h 小时 当天几点,默认当前小时，而一般插件取的都是0点
     * @todo h的值 => [undefined,0,8]
     * @return {Date} 返回时间对象 精确到天
     *  */
    distanceDate: function (day = 0, h = new Date().getHours()) {
        let current = new Date(),
            date = new Date(current.getFullYear(), current.getMonth(), current.getDate(), h);
        return new Date(date.getTime() + 24 * 3600 * 1000 * day)
    },
    /**
     * 获取24时
     *  */
    get24Hour() {
        return '.'.repeat(23).split('.').map((item, index) => index.toString().padStart(2, '0') + ':00')
    },
    /**
     * 获取48时
     *  */
    get48Hour() {
        return DateKit.get24Hour().map(item => [item, item.replace(/:00/, ':30')]).flat(1);
    },
    /**
     * 获取一个月的所有天
     *  */
    get30Date(date, format = 'yyyy-MM-dd') {
        let { end } = DateKit.intervalOfDate('month', date),
            year = end.getFullYear(),
            month = end.getMonth();
        return '.'.repeat(end.getDate() - 1).split('.').map((item, index) => {
            return DateKit.format(new Date(year, month, index + 1), format)
        })

    },
    /**
     * 获取一年中的月
     *  */
    get12Month(date, format = "yyyy-MM") {
        let year;
        date = date ? new Date(date) : new Date();
        year = date.getFullYear();
        return '.'.repeat(11).split('.').map((item, index) => {
            return DateKit.format(new Date(year, index), format);
        })
    }

}
window.DateKit = DateKit;
// 测试
console.log(DateKit.dateFormat('20200401', 'yyyy-MM-dd hh:mm:ss'));
console.log(DateKit.dayOfMonth())
console.log(DateKit.prevMonth())