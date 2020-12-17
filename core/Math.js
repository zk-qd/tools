



var MathKit_Compute = {
    // 加
    add(arg1, arg2) {
        let r1, r2, m;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },
    // 减
    subtract(arg1, arg2) {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        n = r1 >= r2 ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(2);
    },
    // 乘法
    multiply(arg1, arg2) {
        let m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) { }
        try {
            m += s2.split('.')[1].length;
        } catch (e) { }
        return (
            (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
            Math.pow(10, m)
        );
    },
    // 除法
    divide(arg1, arg2) {
        let t1 = 0,
            t2 = 0,
            r1,
            r2;
        try {
            t1 = arg1.toString().split('.')[1].length;
        } catch (e) { }
        try {
            t2 = arg2.toString().split('.')[1].length;
        } catch (e) { }
        r1 = Number(arg1.toString().replace('.', ''));
        r2 = Number(arg2.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    // 生成n个随机字母
    randomCoding(n) {
        //创建26个字母数组
        let database = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            text = [];
        database.push(...database.map(item => item.toLowerCase()));
        for (var i = 0; i < n; i++) {
            text.push(database[Math.floor(Math.random() * 48)]);
        }
        return text.join('');
    },
    // 传入 rgba(225,225,225) 生成十六进制颜色
    // 目前还透明还不能处理
    rgbtohex(rgb) {
        let { r, g, b } = rgb.match(/rgb\(\s*(?<r>\d*),\s*(?<g>\d*),\s*(?<b>\d*)\)/).groups;
        r = Number(r).toString(16).padStart(2, 0);
        g = Number(g).toString(16).padStart(2, 0);
        b = Number(b).toString(16).padStart(2, 0);
        return '#' + r + g + b;
    },
    // hex转rgb
    hextorgb(hex) {
        if (hex.length == 4 || hex.length == 7) {
            let len = (hex.length - 1) / 3;
            return 'rgb(' + hex.replace(/#/, '').match(new RegExp(`[0-9A-z]{${len}}`, 'g'))
                .map(item => parseInt(item.repeat(len == 1 ? 2 : 1), 16)).reduce((t, v, i) => {
                    return t + ',' + v
                }) + ')';
        } else {
            throw new TypeError('hex type error! ' + hex)
        }
    }
}

window.MathKit = {
    ...MathKit_Compute,
}
