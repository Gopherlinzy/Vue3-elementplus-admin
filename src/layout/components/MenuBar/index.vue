<template>
  <el-menu default-active="2" active-text-color="#409EFF" text-color="#fff" class="el-menu" :collapse="collapsed"
    :collapse-transition="false">
    <menu-item :menus="menus"></menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import MenuItem from './MenuItem.vue'

defineProps({
  collapsed: {
    type: Boolean
  }
})

const menus = reactive([
  {
    path: '/',
    redirect: '/index',
    name: 'Index',

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
        component: () => import('@/views/system/SysSetting.vue'),
        meta: {
          title: '系统设置',
          icon: 'Setting',
          roles: ['admin']
        }
      }
    ]

  },

  {
    path: '/order',
    name: 'order',

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
])

</script>

<style lang="scss">
.el-menu {
  background-color: $menuBg;
  border: none;

  .el-sub-menu {
    .el-menu-item {
      background-color: $subMenuBg;
      color: rgb(175, 178, 175);
    }

    // 二级菜单
    /* 修改导航菜单栏悬浮时的背景颜色 */
    .el-sub-menu__title:hover,
    .el-menu-item:focus,
    .el-menu-item:hover {
      color: white;
    }

    /* 导航二级菜单栏点击之后的一像素边的问题 */
    .el-menu {
      border-right: none;
    }
  }
}

/* 修改导航菜单栏悬浮时的背景颜色 */
.el-sub-menu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: rgba(77, 177, 135, 0.933);
}


/* 导航二级菜单栏点击之后的一像素边的问题 */
.el-menu {
  border-right: none;
}

/* 导航栏点击后,左边的颜色设置 */
.el-menu-item.is-active {
  border-left: solid 3px #26a1fa;
  color: white;
  background-color: #38a5f3;
}
</style>