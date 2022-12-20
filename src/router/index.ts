
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import { store } from '@/store'
import { loginByToken } from '@/api/auth'
import 'element-plus/es/components/message/style/css'
import { ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'
import "nprogress/nprogress.css";
import { authStore } from '@/pinia/authStore'
import { menuStore } from '@/pinia/menuStore'
import { buttonStore } from '@/pinia/buttonStore'

// nprogress 配置
NProgress.configure({
  // 动画方式
  easing: 'ease',
  // 递增进度条的速度
  speed: 500,
  // 是否需要显示icon
  showSpinner: false,
  // 自动递增的间隔
  trickleSpeed: 200,
  // 初始化的最小百分比
  minimum: 0.3
})

// 声明 meta 类型
declare module 'vue-router' {
  interface RouteMeta {
    id: number,
    title: string,
    permission: string,
    icon?: string,
    keepAlive?: boolean
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
  // console.log(token);
  const userAuthStore = authStore()
  NProgress.start()
  // 如果内存中和session中都不存在 token， 表示登录失效了
  if (!userAuthStore.token && !token) {
    // 如果已经是从 login界面的判断则不用跳转
    if (to.path.startsWith("/login"))
      next()
    else {
      // ElMessageBox.alert("未登录或者登录过期，请登录", "登录错误");
      next("/login")
    }
  } else if (!userAuthStore.token && token) {
    // console.log(token);
    // 在内存中不存在, 本地中还存在
    loginByToken().then(res => {
      // console.log("路由守卫", res);

      if (res.success) {
        userAuthStore.userInfo = res.data
        userAuthStore.token = res.token
        userAuthStore.changePermission(res.permissions, res.apiPolicies)

        // 确保动态路由被添加
        next({ ...to, replace: true })
        // next()
      } else {
        next("/login")
      }
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router