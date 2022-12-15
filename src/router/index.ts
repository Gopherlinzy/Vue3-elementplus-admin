
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { loginByToken } from '@/api/auth'
import 'element-plus/es/components/message/style/css'
import { ElMessageBox } from 'element-plus'


// 声明 meta 类型
declare module 'vue-router' {
  interface RouteMeta {
    id: number,
    title: string,
    permission: string,
    icon?: string,
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

// 路由守卫
// 前置路由守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  // 如果内存中和session中都不存在 token， 表示登录失效了
  if (!store.state.authStore.token && !token) {
    // 如果已经是从 login界面的判断则不用跳转
    if (to.path.startsWith("/login"))
      next()
    else {
      ElMessageBox.alert("未登录或者登录过期，请登录", "登录错误");
      next("/login")
    }
  } else if (!store.state.authStore.token && token) {
    // console.log(token);
    // 在内存中不存在, 本地中还存在
    loginByToken().then(res => {
      // console.log(res);

      if (res.success) {
        store.commit("authStore/addUserInfo", res.data)
        store.dispatch('menuStore/generateSystemMenus', res.permissions)
        store.dispatch('buttonStore/generateButtons', res.apiPolicies)
        // console.log(router.getRoutes());
        if (to.matched.length == 0) {
          router.push(to.path)
        }
        next()
      }
    })
  } else {
    next()
  }
})



export default router