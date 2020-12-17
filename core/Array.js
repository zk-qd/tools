
var ArrayKit_Context = {
    // 公交上线趋势
    // 网约上线趋势
    dateSort/* 输入小时对象 然后进行排序 */(data) {
        return Object.keys(data).sort().map(item => data[item]);
    },
    /**
     * *按照指定内容排序  
     * todo assignSort(target,sortby,assign)
     * @param {Array} target 排列对象
     * @param {Function} sortby 比较函数
     * @param {Array} assign 指定对象
     * @return {Array} 返回排序好的新对象
     * !sortby: 比较函数 
     * @param {Object} item 排列对象其中一项
     * @param {Any} assignItem 指定对象其中一项
     * ? 该方法不改变原有数组，返回一个新的数组
     * ? 排列对象如果有重复的，前后顺序还是以排列对象的前后顺序 
     * */
    assignSort: function (target, sortby, assign) {
        const arr = [], copyTarget = JSON.parse(JSON.stringify(target));
        assign.forEach((assignItem, assignIndex) => {
            // 匹配到的项
            let cindex = copyTarget.findIndex(citem => sortby(citem, assignItem));
            if (cindex !== -1) {
                arr[assignIndex] = JSON.parse(JSON.stringify(copyTarget[cindex]));
                copyTarget.splice(cindex, 1);
            };
        })
        return arr;
    },
    /**
     * todo 简单排序
     * * 无key 类似target = [1,2,3]
     * * 有key 类似target = [{age: 10},{age: 20}]
     * @param {Array} target 目标数组
     * @param {String} type 升序or降序  up or down
     * @param {String} key 比较的key
     *  */
    sort(target, type = 'up', key) {
        target.sort((value1, value2) => {
            if (type == 'down') [value2, value1] = [value1, value2] // 降序
            if (key) {
                // 有key比较key的值
                return value1[key].toString().localeCompare(value2[key].toString());
            } else {
                // 无key直接比较
                return value1.localeCompare(value2);
            }
        });
    },


}


window.ArrayKit = {
    ...ArrayKit_Context,
}
