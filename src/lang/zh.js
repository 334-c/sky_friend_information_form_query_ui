let zhCn = {
    main:{
      欢迎语: "欢迎来到光遇交友查询系统"
    },
    e: {
        切换语言: "Switch English",
        查询: "",
        重置: "",
        单词: "",
        单词以空格分离: "",
        复合词: "",
        每一个字都是一个词: "",
        分隔线: "≡ω≡",
        详细文本: "",
        寻找类型: "",
        想要找这样的人: "",
        光之子自述: "",
        年龄: "",
        性别: "",
        联系方式: "",
        更新时间: "",
        区服: "",
        语言: "",
    },
    data: {
        男孩子: "",
        女孩子: "",
        光之子: "",
        国服: "",
        国际服: "",
        测试服: "",
        中文: "",
        English: "英文",
        "Lover": "对象（特指可奔现）",
        "Coupling": "CP（特指仅游戏cp）",
        "Parents": "监护",
        "Children": "崽崽",
        "Long-term friend": "固玩",
        "Friends": "普友",
        "Virtual love": "虚恋",
        "Club": "入团",
        "Other": "其他",
    },
    system: {
        分隔符: "\n"
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