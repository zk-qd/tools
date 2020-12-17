const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// 根目录相对路径
const root = '../'
// core文件夹
const cores = path.resolve(root, './core');
// depend文件夹
const depends = path.resolve(root, './depend');

// core文件
const main = path.resolve(root, './bundle/core.js');
// depend文件
const depend = path.resolve(root, './bundle/depend.js');

// 判断并删除
var existMain = fs.existsSync(main);
var existDepend = fs.existsSync(depend);
if (existMain) fs.unlinkSync(main);
if (existDepend) fs.unlinkSync(depend);

// 创建文件或者清空内容
fs.writeFileSync(main, '');
fs.writeFileSync(depend, '');

// 获取core目录所有文件
let coresList = fs.readdirSync(cores);
let dependList = fs.readdirSync(depends);

// 写入denpen和core文件集
writeContent(dependList, depends, depend);
writeContent(coresList, cores, main);

function writeContent(list, folderpath, writeInPath) {
    list.forEach(item => {
        // 排除json和lock文件
        if (item.match(/\.json$/g)) {
            console.log(chalk.blue('排除' + item))
            return false;
        };
        if (item.match(/\.lock$/g)) {
            console.log(chalk.blue('排除' + item));
            return false;
        };
        // 获取文件路径
        let filepath = path.resolve(folderpath, item);
        let query = fs.statSync(filepath);
        // 筛选
        if (query.isFile()) {
            let content = fs.readFileSync(filepath)
                // 需要去除注释
                // .toString().replace(/(\s*[^'"]\/\/.*)|(\s*\/\*[\s\S]*?\*\/\s*)/gm, '');
                .toString().replace(/(\s*\/\/.*)|(\s*\/\*[\s\S]*?\*\/\s*)/gm, '');
            // console.log(chalk.red(content.toString()))
            // 写入
            fs.appendFileSync(writeInPath, '//' + item + '\r\n' + content + '\r\n');
            console.log(chalk.blue('合并' + filepath + '到'), chalk.green(writeInPath));
        } else {
            console.log(chalk.blue('排除' + filepath))
        };
    });
}





