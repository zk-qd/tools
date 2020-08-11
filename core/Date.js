
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
    getDates /* 获取一个月的天数 */(date) {
        if (date) {
            date = new Date(date);
        } else {
            //   没有传入时间 那么就是当前时间
            date = new Date();
        }
        let year = date.getFullYear(),
            month = date.getMonth() + 1;
        return new Date(year, month, 0).getDate();
    }
}
window.DateKit = DateKit;
// 测试
console.log(DateKit.dateFormat('20200401', 'yyyy-MM-dd hh:mm:ss'));
console.log(DateKit.getDates())