import axiosInstance from "../axios";

interface UserInfo {
    id: string
    name: string
    email: string
    phone: string
    password: string
    city: string
    introduction: string
}

interface ResetPassword {
    password: string
    new_password: string
    new_password_confirm: string
}

interface UserRole {
    id: string
    role_name: string
}

// 获取所有用户
export function getAllSysUsers() {
    return axiosInstance({
        url: "v1/users",
        method: "get"
    })
}

// 获取分页用户
export function getPaginationSysUsers(page: number, sort: string, order: string, per_page: number) {
    return axiosInstance({
        url: "v1/users?page=" + page + "&sort=" + sort + "&order=" + order + "&per_page=" + per_page,
        method: "get"
    })
}

// 前往上一页/下一页
export function getPaginationPrevNextUsers(URL: string) {
    return axiosInstance({
        url: URL,
        method: "get"
    })
}

// 添加用户
export function addSysUser(sysUser: UserInfo) {
    return axiosInstance({
        url: "v1/users",
        method: "post",
        data: sysUser
    })
}

// 修改用户信息
export function updateSysUser(userRequest: UserInfo) {
    return axiosInstance({
        url: "v1/users",
        method: "put",
        data: userRequest
    })
}

// 删除用户
export function deleteSysUsers(userRequest: UserInfo) {
    return axiosInstance({
        url: "v1/users",
        method: "delete",
        data: userRequest
    })
}


// 重置密码
export function resetPassword(userRequest: UserInfo) {
    return axiosInstance({
        url: "v1/users/reset",
        method: "post",
        data: userRequest
    })
}

// 设置授权
export function setRole(sysUserRole: UserRole) {
    return axiosInstance({
        url: "v1/users/role",
        method: "post",
        data: sysUserRole
    })
}