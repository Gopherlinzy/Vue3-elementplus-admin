import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

const goodsRouter: RouteRecordRaw = {
    path: '/goods',
    name: 'goods',
    component: Layout,
    meta: {
        id: 11,
        title: '商品管理',
        permission: "system:goods",
        icon: 'TakeawayBox',
    },
    children: [
        {
            path: 'goodsCategory',
            name: 'goodsCategory',
            component: () => import('@/views/goods/GoodsCategory.vue'),
            meta: {
                id: 12,
                title: '商品种类',
                permission: 'system:goods:goodsCategory',
                icon: 'ShoppingBag',
            },
        },
        {
            path: 'goodsInfo',
            name: 'goodsInfo',
            component: () => import('@/views/goods/GoodsInfo.vue'),
            meta: {
                id: 13,
                title: '商品信息',
                permission: 'system:goods:goodsInfo',
                icon: 'SoldOut',
            },
        },
    ],
}

export default goodsRouter