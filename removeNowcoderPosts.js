// ==UserScript==
// @name         移除牛客网上包含关键字的帖子-beta
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  移除牛客网上包含某些关键字的帖子，使之不显示在列表中。参考代码('https://greasyfork.org/zh-CN/scripts/387351-%E7%A7%BB%E9%99%A4leetcode%E4%BB%98%E8%B4%B9%E9%A2%98%E7%9B%AE-beta')
// @author       三指弹天
// @match        *://www.nowcoder.com/discuss*
// @grant        none
// ==/UserScript==

const ncMaskKeyWords = [
    ['许愿'],
    ['许个愿'],
    ['offer','比较'],
    ['offer','选择'],
    ['渣硕']
];
// 子数组之间为 or 关系，子数组内部各个关键字为 and 关系
(function() {
    'use strict';
    main();
})();

function main() {
    remove();
    setInterval(remove, 5000);
}


function shouldHidden(text){
    for (let keyWords of ncMaskKeyWords) {
        let containWord = true
        for (let keyWord of keyWords) {
            if(text.indexOf(keyWord)<0){
                containWord =false
                break
            }
        }
        if(containWord){
            return true
        }
    }
    return false
}
function remove() {
    var postedContents = $(".common-list");
    if (postedContents.length === 1) {
        var lis = postedContents.find("li");
        for(var i = 0; i < lis.length; i++){
            var li = $(lis.get(i));
            if (li.is(":hidden")) {
                continue;
            }
            let postTitle = li.find(".discuss-main").find("a").get(0).innerHTML.trim().toLocaleLowerCase()
            if (shouldHidden(postTitle)){
                console.log('try to hide '+postTitle)
                li.hide()
            }
        }
    }
}
