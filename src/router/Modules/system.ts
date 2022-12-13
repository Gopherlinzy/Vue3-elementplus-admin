import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n';

const systemRouter: RouteRecordRaw = {
    path: '/superAdmin',
    name: 'superAdmin',
    component: Layout,
    meta: {
        id: 2,
        title: i18n.global.t('menus.wSuperAdmin'),
        permission: "system:superAdmin",
        icon: 'Avatar',
        roles: ['admin', 'editor']
    },
    children: [
        {
            path: 'roles',
            name: 'roles',
            component: () => import('@/views/superAdmin/Role.vue'),
            meta: {
                id: 3,
                title: i18n.global.t('menus.wRoleManger'),
                permission: "system:superAdmin:role",
                icon: 'UserFilled',
                roles: ['editor']
            }

        },
        {
            path: 'apis',
            name: 'apis',
            component: () => import('@/views/superAdmin/Api.vue'),
            meta: {
                id: 4,
                title: i18n.global.t('menus.wApiManger'),
                permission: 'system:superAdmin:api',
                icon: 'Platform',
                roles: ['admin']
            }
        }, {
            path: 'menus',
            name: 'menus',
            component: () => import('@/views/superAdmin/Menu.vue'),
            meta: {
                id: 5,
                title: i18n.global.t('menus.wMenuManger'),
                permission: "system:superAdmin:menu",
                icon: 'Memo',
                roles: ['editor']
            }

        }, {
            path: 'users',
            name: 'users',
            component: () => import('@/views/superAdmin/User.vue'),
            meta: {
                id: 6,
                title: i18n.global.t('menus.wUserManger'),
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
                title: i18n.global.t('menus.wSystemConfig'),
                permission: "system:superAdmin:sysSetting",
                icon: 'Setting',
                roles: ['admin']
            }
        }
    ]
}

export default systemRouter