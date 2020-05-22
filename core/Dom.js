window.DomKit = {
    // 复制元素文本
    copyText(dom) {
        if (document.body.createTextRange) {
            let range = document.body.createTextRange();
            range.moveToElementText(dom);
            range.select();
        } else if (window.getSelection) {
            let selection = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(dom);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand("copy");
    }
}