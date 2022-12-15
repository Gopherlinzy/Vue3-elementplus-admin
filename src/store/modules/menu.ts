import { Module } from "vuex";
import { RootState } from "../index";
import { asyncRoutes } from "@/router/Modules";
import { RouteRecordRaw } from "vue-router";
import router from "@/router";

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

export interface MenuState {
    menuList: RouteRecordRaw[]
}


function hasPermission(permsID: permissionsRequest[], needpermID: number) {
    for (let i = 0; i < permsID?.length; i++) {
        // console.log(permsID[i].id);
        if (permsID[i].id === needpermID) {
            return true
        }
    }
    return false
}

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

export const menuStore: Module<MenuState, RootState> = {
    namespaced: true,
    state: (): MenuState => ({
        menuList: []
    }),
    getters: {
        getMenus: state => state.menuList
    },
    mutations: {
        setMenus(state, systemMenu) {
            state.menuList = systemMenu
        }
    },
    actions: {
        generateSystemMenus({ commit, state }: any, perms: permissionsRequest[]) {
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
            commit('setMenus', routers)
        }
    }
}