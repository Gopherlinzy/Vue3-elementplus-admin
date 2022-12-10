import Layout from '@/layout/index.vue'
import {
    RouteRecordRaw,
} from "vue-router";

const orderRouter: RouteRecordRaw = {
    path: '/order',
    name: 'order',
    component: Layout,
    meta: {
        id: 8,
        title: '订单管理',
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
                title: '订单查询',
                permission: 'system:order:orderInfo',
                icon: 'Notification',
            },
        },
        {
            path: 'orderManage',
            name: 'orderManage',
            component: () => import('@/views/orders/OrderManage.vue'),
            meta: {
                id: 10,
                title: '订单管理',
                permission: 'system:order:orderManage',
                icon: 'Money',
            },
        },
    ],
}

export default orderRouter