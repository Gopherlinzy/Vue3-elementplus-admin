
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { store } from '@/store'
import { loginByToken } from '@/api/auth'
import 'element-plus/es/components/message/style/css'
import { ElMessageBox } from 'element-plus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  }, {
    path: '/',
    redirect: '/index',
    name: 'Index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'house',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/Index.vue'),
        meta: {
          title: '首页',
          icon: 'house',

        },
      },
    ],
  },
  {
    path: '/superAdmin',
    name: 'superAdmin',
    component: Layout,
    meta: {
      title: '超级管理员',
      icon: 'Wallet',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/superAdmin/Role.vue'),
        meta: {
          title: '角色管理',
          icon: 'User',
          roles: ['editor']
        }

      },
      {
        path: 'apis',
        name: 'apis',
        component: () => import('@/views/superAdmin/Api.vue'),
        meta: {
          title: 'API管理',
          icon: 'Refrigerator',
          roles: ['admin']
        }
      }, {
        path: 'menus',
        name: 'menus',
        component: () => import('@/views/superAdmin/Menu.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Clock',
          roles: ['editor']
        }

      }, {
        path: 'users',
        name: 'users',
        component: () => import('@/views/superAdmin/User.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
          roles: ['editor']
        }

      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/superAdmin/SysSetting.vue'),
        meta: {
          title: '系统设置',
          icon: 'Setting',
          roles: ['admin']
        }
      }
    ]

  }, {
    path: '/order',
    name: 'order',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'Notebook',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'orderInfo',
        name: 'orderInfo',
        component: () => import('@/views/orders/OrderInfo.vue'),
        meta: {
          title: '订单查询',
          icon: 'Notification',
        },
      },
      {
        path: 'orderManage',
        name: 'orderManage',
        component: () => import('@/views/orders/OrderManage.vue'),
        meta: {
          title: '订单处理',
          icon: 'Money',
        },
      },
    ],
  }, {
    path: '/goods',
    name: 'goods',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'TakeawayBox',
    },
    children: [
      {
        path: 'goodsCategory',
        name: 'goodsCategory',
        component: () => import('@/views/goods/GoodsCategory.vue'),
        meta: {
          title: '商品种类',
          icon: 'ShoppingBag',
        },
      },
      {
        path: 'goodsInfo',
        name: 'goodsInfo',
        component: () => import('@/views/goods/GoodsInfo.vue'),
        meta: {
          title: '商品信息',
          icon: 'SoldOut',
        },
      },
    ],
  }
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
    loginByToken(token).then(res => {
      if (res.success) {
        store.commit("authStore/addUserInfo", res.data)
        router.addRoute({
          path: "/test",
          component: () => import('@/views/system/SysSetting.vue'),
        })
        // console.log(router.getRoutes());

        next()
      }
    })
  } else {
    next()
  }
})



export default router