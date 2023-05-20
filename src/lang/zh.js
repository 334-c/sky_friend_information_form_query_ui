let zhCn = {
    main:{
      message:"消息",
      display:"展示",
    },
    e: {
        切换语言: "Switch English",
        查询: "",
        重置: "",
        单词: "",
        单词以空格分离: "",
        复合词: "",
        每一个字都是一个词: "",
        分隔线: "x"
    }
}
function init(obj) {
    if(typeof obj == "object" && obj) {
        for (const k in obj) {
            if (typeof obj[k] == "object") {
                init(obj[k])
            } else if(!obj[k]) {
                obj[k] = k;
            }
        }
    }
}
init(zhCn);
export default zhCn