
// universal judge
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

window.JudgeKit = {
    ...JudgeKit_Judge,
}

