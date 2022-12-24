import Layout from '@/layout/index.vue';
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
// import { asyncRoutes } from "@/router/Modules";
import { getPiniaMenus } from '@/api/system/role'
import router from "@/router";

const modules = import.meta.glob('../**/**/*.vue')

export interface MenuState {
    menuList: RouteRecordRaw[]
}

interface permissionsRequest {
    id: number,
    title: string,
    permission: string,
    name: string,
    path: string,
    component: string,
    parent_id: string,
    status: boolean,
    keepAlive: boolean,
    created_at: string
}

// 权限鉴定
function hasPermission(permsID: permissionsRequest[], needpermID: number) {
    for (let i = 0; i < permsID?.length; i++) {
        // console.log(permsID[i].id);
        if (permsID[i].id === needpermID) {
            return true
        }
    }
    return false
}

// // 过滤动态路由
// function fileterRouter(routes: RouteRecordRaw[], perms: permissionsRequest[]) {
//     const res: RouteRecordRaw[] = []
//     routes.forEach(route => {
//         if (route.children) {
//             route.children = fileterRouter(route.children, perms)
//             if (route.children.length > 0) {
//                 res.push(route)
//             }
//         } else {
//             // 判断是否存在限定的权限菜单属性，不是限定则直接添加
//             if (route.meta!.id) {
//                 if (hasPermission(perms, route.meta!.id)) {
//                     res.push(route)
//                 }
//             } else {
//                 res.push(route)
//             }
//         }

//     });
//     return res
// }

export const initMenu = (menus: any) => {
    menus.forEach((el: any) => {
        if (el.component === 'Layout') {
            // el.redirect = '/index'
            el.component = Layout
        } else {
            el.component = modules[`../${el.component}`]
        }
        if (el.children != null && el.children.length) {
            initMenu(el.children)
        }
    });
    return menus
}

// 定义容器
export const menuStore = defineStore('menu', {
    state: (): MenuState => ({
        menuList: []
    }),
    getters: {
        getMenus: state => state.menuList
    },
    actions: {
        async generateSystemMenus() {
            // let routers = fileterRouter(asyncRoutes, perms)
            let routers: RouteRecordRaw[] = []


            await getPiniaMenus().then(res => {
                // console.log(res.data);
                routers = initMenu(res.data)

                // 添加到动态路由
                routers.forEach(route => {
                    // 只有一个二级菜单权限，直接变为一级菜单
                    if (route.redirect == null && route.children?.length == 1) {
                        route.redirect = route.path + "/" + route.children[0].path
                        route.meta = route.children[0].meta
                    }
                    router.addRoute(route)
                })

                // 添加动态菜单
                this.menuList = routers
                router.replace(router.currentRoute.value.fullPath)
            })
            // console.log(router.currentRoute.value.fullPath);
        }
    }
})