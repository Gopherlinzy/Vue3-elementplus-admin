
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as ElementUI from 'element-plus'

// 创建vue实例app
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 启动我们需要的插件
app.use(router).use(store, key).mount('#app')

declare module 'vue' {
  interface ComponentCustomProperties {
    $lin: string,
  }
}

app.config.globalProperties.$lin = "linzy"

