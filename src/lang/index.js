import { createI18n } from 'vue-i18n'
import enLocale from './en.js';
import zhLocale from './zh.js';

const localLang = navigator.language.split('-')[0];
const storageLang = window.localStorage.getItem('locale')?.split('"')[1].split('"')[0].toLocaleLowerCase() || 'zh';
const c = (storageLang.toLocaleLowerCase() !== 'zh' && storageLang.toLocaleLowerCase() !== 'en') ? 'en' : storageLang;

const i18n = createI18n({
    globalInjection: true, //全局生效$t
    locale: c || localLang || 'en',
    messages: {
        zh: zhLocale,
        cn: zhLocale,
        en: enLocale,
        us: enLocale,
    },
    legacy: false,
})

export default i18n