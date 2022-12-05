import axiosInstance from "../axios";

interface UserInfo {
    username: string
}

export function getAllSysUsers() {
    return axiosInstance({
        url: "v1/users",
        method: "get"
    })
}

export function addSysUser(userRequest: object) {
    return axiosInstance({
        url: "v1/users",
        method: "post",
        data: userRequest
    })
}


export function updateSysUser(userRequest: object) {
    return axiosInstance({
        url: "v1/users",
        method: "put",
        data: userRequest
    })
}

export function deleteSysUsers(userRequest: object) {
    return axiosInstance({
        url: "v1/users",
        method: "delete",
        data: userRequest
    })
}

export function resetPassword(userRequest: object) {
    return axiosInstance({
        url: "v1/users",
        method: "put",
        data: userRequest
    })
}

export function setRole(userRequest: object) {
    return axiosInstance({
        url: "v1/users/role",
        method: "post",
        data: userRequest
    })
}