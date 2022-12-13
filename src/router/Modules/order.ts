import Layout from '@/layout/index.vue'
import {
    RouteRecordRaw,
} from "vue-router";
import i18n from '@/i18n';

const orderRouter: RouteRecordRaw = {
    path: '/order',
    name: 'order',
    component: Layout,
    meta: {
        id: 8,
        title: i18n.global.t('menus.wOrderManger'),
        permission: "system:order",
        icon: 'Notebook',
        roles: ['admin', 'editor']
    },
    children: [
        {
            path: 'orderInfo',
            name: 'orderInfo',
            component: () => import('@/views/orders/OrderInfo.vue'),
            meta: {
                id: 9,
                title: i18n.global.t('menus.wOrderQuery'),
                permission: 'system:order:orderInfo',
                icon: 'Notification',
            },
        },
        {
            path: 'orderProcess',
            name: 'orderProcess',
            component: () => import('@/views/orders/OrderProcess.vue'),
            meta: {
                id: 10,
                title: i18n.global.t('menus.worderProcess'),
                permission: 'system:order:orderManage',
                icon: 'Money',
            },
        },
    ],
}

export default orderRouter