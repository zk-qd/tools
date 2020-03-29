const fs = require('fs');

const targetFolder = '../../tools';
const result = fs.readdirSync(targetFolder);


result.forEach(item => {
    let relative = targetFolder + '/' + item;
    let query = fs.statSync(relative);
    // 筛选
    if (query.isFile()) {
        let content = fs.readFileSync(relative);
        // 写入
        fs.writeFileSync('./merge.js',content + '\r\n');
    };
});





