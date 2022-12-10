import Layout from '@/layout/index.vue'

import {
    RouteRecordRaw,
} from "vue-router";

const homeRouter: RouteRecordRaw = {
    path: '/',
    redirect: '/index',
    name: 'Index',
    component: Layout,
    meta: {
        id: 1,
        title: '首页',
        permission: "system:index",
        icon: 'house',
    },
    children: [
        {
            path: 'index',
            name: 'Index',
            component: () => import('@/views/index/Index.vue'),
            meta: {
                id: 1,
                title: '首页',
                permission: "system:index",
                icon: 'house',
            },
        },
    ],
}

export default homeRouter