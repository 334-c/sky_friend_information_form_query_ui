import { createApp, ref, watch } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index"
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import i18n from './lang/index'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import './styles/dark/css-vars.css'

const app = createApp(App).use(ElementPlus, {
    locale: zhCn
}).use(i18n).use(router);
const title = ref("加载中")

// 全局动态标题
app.provide("title", title)
watch(title, (newValue, oldValue) => {
    document.title = newValue;
});

app.mount('#app')
