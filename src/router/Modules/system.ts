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
        icon: 'Avatar',
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
                icon: 'UserFilled',
                keepAlive: true,
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
                icon: 'Platform',
                keepAlive: true,
            }
        }, {
            path: 'menus',
            name: 'menus',
            component: () => import('@/views/superAdmin/Menu.vue'),
            meta: {
                id: 5,
                title: '菜单管理',
                permission: "system:superAdmin:menu",
                icon: 'Menu',
                keepAlive: true,
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
                keepAlive: true,
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
                keepAlive: true,
            }
        }
    ]
}

export default systemRouter