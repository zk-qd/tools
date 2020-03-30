const fs = require('fs');
const chalk = require('chalk')

const targetFolder = '../../tools';
const merge = './merge.js';

// 删除
fs.unlinkSync(merge);
// 创建
fs.writeFileSync(merge, '');

// 文件集合
let result = fs.readdirSync(targetFolder);



// 判断并写入
result.forEach(item => {
    // 排除json和lock文件
    if (item.match(/\.json$/g)) return false;
    if (item.match(/\.lock$/g)) return false;
    let relative = targetFolder + '/' + item;
    let query = fs.statSync(relative);
    // 筛选
    if (query.isFile()) {
        let content = fs.readFileSync(relative)
        // 需要去除注释
        // .toString().replace(/^\s*(\/\/)+.\n$/gs,'');
        // console.log(chalk.red(content.toString()))
        // 写入
        fs.appendFileSync(merge, '//' + item + '\r\n' + content + '\r\n\r\n');
        console.log(chalk.green('合并' + relative + '到' + merge));
    } else {
        console.log(chalk.blue('排除' + relative))
    };
});





