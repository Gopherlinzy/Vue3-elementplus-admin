import axiosInstance from "../axios";

// 获取所有菜单
export function getAllMenus() {
    return axiosInstance({
        url: "v1/menus",
        method: "get"
    })
}

// 获取分页api
export function getPagMenus() {
    return axiosInstance({
        url: "v1/menus/pag",
        method: "get"
    })
}
