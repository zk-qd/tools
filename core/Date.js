
const DateKit_Schema = {
    parseSerialDate(val) {
        return new Date(val.replace(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/, '$<year>/$<month>/$<day>'));
    }
}
const DateKit = {
    ...DateKit_Schema,
    dateFormat:/* data format */ function (date, format) {

        if (!date) date = new Date();
        else if (date.toString().length == 8) date = this.parseSerialDate(date);
        else date = new Date(date);
        if (!format) format = 'yyyy-MM-dd';
        // 注意月份是 MM 分钟是mm
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
        date = new Date();
        let month = date.getMonth(),
            year = date.getFullYear();
        return new Date(year, month - 1, 1);
    },
    currentMonth: /* 获取当前月份的Date对象 */function () {
        return new Date();
    },
    nextMonth: /* 获取下一个月的Date对象 */ function (date) {
        if (date) date = new Date(date);
        date = new Date();
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
    }
}
window.DateKit = DateKit;
// 测试
console.log(DateKit.dateFormat('20200401', 'yyyy-MM-dd hh:mm:ss'));
console.log(DateKit.dayOfMonth())
console.log(DateKit.prevMonth())