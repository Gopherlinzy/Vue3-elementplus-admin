import axiosInstance from "../axios";

// 获取所有菜单
export function getAllMenus() {
    return axiosInstance({
        url: "v1/menus",
        method: "get"
    })
}

// 获取菜单目录列表
export function getAllBaseMenus() {
    return axiosInstance({
        url: "v1/menus/baseMenus",
        method: "get"
    })
}

// 获取分页menu
export function getPagMenus() {
    return axiosInstance({
        url: "v1/menus/pag",
        method: "get"
    })
}

// 新增menu
export function addmenu(menuRequest: object) {
    return axiosInstance({
        url: "v1/menus",
        method: "post",
        data: menuRequest
    })
}
// 更新menu
export function updatemenu(menuRequest: object) {
    return axiosInstance({
        url: "v1/menus",
        method: "put",
        data: menuRequest
    })
}

// 删除menu
export function deletemenu(menuRequest: object) {
    return axiosInstance({
        url: "v1/menus",
        method: "delete",
        data: menuRequest
    })
}