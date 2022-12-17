import { createI18n } from 'vue-i18n'
import CN from "./cn/cn"
import EN from "./en/en"

const i18nMessage = {
    chs: {
        ...CN,
    },
    en: {
        ...EN,
    }
}

const i18n = createI18n({
    legacy: false,
    locale: 'en', // 设置默认语言
    // fallbackLocale: 'chs',
    globalInjection: true, // $t保证中英文切换 
    messages: i18nMessage, // 设置资源文件对象
    allowComposition: true,// 允许组合式api
})

export default i18n

