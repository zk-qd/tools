// operation
var FormKit_Operation = {
    // get form data
    getForm({ formSel, prefix } = /* 依赖error */ErrorKit.emptyParameterException()) {
        var form = document.querySelector(formSel);
        if (!form) return FormKit_Message['form-notExist'];
        var data = form.serializeArray();
        if (prefix) {
            data = data.reduce((total, item) => {
                total[item.name.substr(1, item.name.length)] = item.value;
                return total;
            }, {});
        } else {
            data = data.reduce((total, item) => {
                total[item.name] = item.value;
                return total;
            }, {});
        }
        return data;
    },
    // set form data
    setForm({ formSel, prefix, params } = /* 依赖error */ErrorKit.emptyParameterException()) {
        // 表单对象
        const form = document.querySelector(formSel);
        if (!form) return FormKit_Message['form-notExist'];
        // 表单元素
        let ele;
        for (var key in params) {
            if (prefix) ele = form.querySelector('[name=' + prefix + key + ']');
            else ele = form.querySelector('[name=' + key + ']');
            if (ele) ele.value = params[key];
        }
    },
    /**
     * * 其他格式转formData
     * @param {Any} data 数据源
     * @return {FormData} formData数据
     */
    toFormData(data) {
        let type = Object.prototype.toString.call(data);
        switch (type) {
            case "[object Object]":
                return Object.entries(data).reduce((t, v) => {
                    Reflect.apply(t.append, t, v);
                    return t;
                }, new FormData());
            case "[object Array]":
                return Object.entries(data).reduce((t, v) => {
                    Reflect.apply(t.append, t, v);
                    return t;
                }, new FormData());
        }
    }

}
// verify 
var FormKit_Verify = {

}
// message
var FormKit_Message = {
    ['form-notExist']: 'The form doesn\'t exist',
}


window.FormKit = {
    ...FormKit_Message,
    ...FormKit_Verify,
    ...FormKit_Operation,
};