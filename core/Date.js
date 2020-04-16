
var DateKit_Schema = {
    parseSerialDate(val) {
        return new Date(val.replace(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/, '$<year>/$<month>/$<day>'));
    }
}
var DateKit = {
    ...DateKit_Schema,
    dateFormat:/* data format */ function (date, format) {

        if (!date) date = new Date();
        else if(date.length == 8) date = this.parseSerialDate(date);
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
    }
}
console.log(DateKit.dateFormat('20200401','yyyy-MM-dd hh:mm:ss'));