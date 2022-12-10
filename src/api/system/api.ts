import axiosInstance from "../axios";

// 获取所有api
export function getAllApis() {
    return axiosInstance({
        url: "v1/apis",
        method: "get"
    })
}

// 获取分页api
export function getPagApis() {
    return axiosInstance({
        url: "v1/apis/pag",
        method: "get"
    })
}