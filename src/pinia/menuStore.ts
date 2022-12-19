import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from "@/router/Modules";
import router from "@/router";


export interface MenuState {
    menuList: RouteRecordRaw[]
}

interface permissionsRequest {
    id: number,
    name: string,
    permissions: string,
    router_name: string,
    router_path: string,
    vue_path: string,
    status: boolean,
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

// 过滤动态路由
function fileterRouter(routes: RouteRecordRaw[], perms: permissionsRequest[]) {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        if (route.children) {
            route.children = fileterRouter(route.children, perms)
            if (route.children.length > 0) {
                res.push(route)
            }
        } else {
            // 判断是否存在限定的权限菜单属性，不是限定则直接添加
            if (route.meta!.id) {
                if (hasPermission(perms, route.meta!.id)) {
                    res.push(route)
                }
            } else {
                res.push(route)
            }
        }

    });
    return res
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
        generateSystemMenus(perms: permissionsRequest[]) {
            let routers = fileterRouter(asyncRoutes, perms)

            // 添加到动态路由
            routers.forEach(route => {
                // 只有一个二级菜单权限，直接变为一级菜单
                if (route.redirect == null && route.children?.length == 1) {
                    route.redirect = route.path + "/" + route.children[0].path
                    route.meta = route.children[0].meta
                }
                router.addRoute(route)
            })
            // console.log(router.getRoutes());

            // 添加动态菜单
            this.menuList = routers
        }
    }
})