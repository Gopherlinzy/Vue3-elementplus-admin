import { createI18n } from "vue-i18n"
import CN from "./cn/cn"
import EN from "./en/en"

const messages = {
    chs: {
        ...CN,
    },
    en: {
        ...EN,
    }
}

const i18n = createI18n({
    legacy: false,
    locale: 'chs',
    globalInjection: true, // $t保证中英文切换
    messages: messages
})

export default i18n