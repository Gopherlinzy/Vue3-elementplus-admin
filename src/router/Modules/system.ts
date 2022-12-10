import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

const systemRouter: RouteRecordRaw = {
    path: '/superAdmin',
    name: 'superAdmin',
    component: Layout,
    meta: {
        id: 2,
        title: '超级管理员',
        permission: "system:superAdmin",
        icon: 'Wallet',
        roles: ['admin', 'editor']
    },
    children: [
        {
            path: 'roles',
            name: 'roles',
            component: () => import('@/views/superAdmin/Role.vue'),
            meta: {
                id: 3,
                title: '角色管理',
                permission: "system:superAdmin:role",
                icon: 'User',
                roles: ['editor']
            }

        },
        {
            path: 'apis',
            name: 'apis',
            component: () => import('@/views/superAdmin/Api.vue'),
            meta: {
                id: 4,
                title: 'API管理',
                permission: 'system:superAdmin:api',
                icon: 'Refrigerator',
                roles: ['admin']
            }
        }, {
            path: 'menus',
            name: 'menus',
            component: () => import('@/views/superAdmin/Menu.vue'),
            meta: {
                id: 5,
                title: '菜单管理',
                permission: "system:superAdmin:menu",
                icon: 'Clock',
                roles: ['editor']
            }

        }, {
            path: 'users',
            name: 'users',
            component: () => import('@/views/superAdmin/User.vue'),
            meta: {
                id: 6,
                title: '用户管理',
                permission: "system:superAdmin:user",
                icon: 'User',
                roles: ['editor']
            }

        },
        {
            path: 'setting',
            name: 'setting',
            component: () => import('@/views/superAdmin/SysSetting.vue'),
            meta: {
                id: 7,
                title: '系统设置',
                permission: "system:superAdmin:sysSetting",
                icon: 'Setting',
                roles: ['admin']
            }
        }
    ]
}

export default systemRouter