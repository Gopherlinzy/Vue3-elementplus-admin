
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessageBox, MessageBoxData, ElNotification } from 'element-plus'
import i18n from './i18n'
import * as ElementUI from 'element-plus'
import * as echarts from "echarts"
import { createPinia } from 'pinia'

// 创建vue实例app
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 启动我们需要的插件
app.use(router).use(store, key).use(createPinia).use(i18n).mount('#app')

app.config.globalProperties.$echarts = echarts // 全局挂载echarts

// 自定义指令 按钮权限
app.directive("BTNVis", {
  // 当元素挂载dom元素
  mounted(el, binding) {
    if (!store.state.buttonStore.buttonList.includes(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

declare module 'vue' {
  interface ComponentCustomProperties {
    $lin: string,
  }
}

app.config.globalProperties.$lin = "linzy"

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $Alert: (message: string, title: string) => Promise<MessageBoxData>,
    $Confirm: (message: string, title: string) => Promise<MessageBoxData>,
    $Notify: any,
  }
}

app.config.globalProperties.$Alert = ElMessageBox.alert
app.config.globalProperties.$Confirm = ElMessageBox.confirm
app.config.globalProperties.$Notify = ElNotification
