import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n';

const goodsRouter: RouteRecordRaw = {
    path: '/goods',
    name: 'goods',
    component: Layout,
    meta: {
        id: 11,
        title: i18n.global.t('menus.wGoodsManger'),
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
                title: i18n.global.t('menus.wGoodsCategory'),
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
                title: i18n.global.t('menus.wGoodsInfo'),
                permission: 'system:goods:goodsInfo',
                icon: 'SoldOut',
            },
        },
    ],
}

export default goodsRouter