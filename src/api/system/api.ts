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

// 新增api
export function addApi(apiRequest: object) {
    return axiosInstance({
        url: "v1/apis",
        method: "post",
        data: apiRequest
    })
}
// 更新api
export function updateApi(apiRequest: object) {
    return axiosInstance({
        url: "v1/apis",
        method: "put",
        data: apiRequest
    })
}

// 删除api
export function deleteApi(apiRequest: object) {
    return axiosInstance({
        url: "v1/apis",
        method: "delete",
        data: apiRequest
    })
}