import axiosInstance from "../axios";

interface AddUpdateUserInfo {
    id: string
    name: string
    email: string
    phone: string
    password: string
    city: string
    introduction: string
    role_name: string
}


interface UserIDInfo {
    id: string
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

interface UserStatus {
    id: string
    status: string
}

// 获取所有用户
export function getAllSysUsers() {
    return axiosInstance({
        url: "v1/users",
        method: "get"
    })
}


// 添加用户
export function addSysUser(sysUser: AddUpdateUserInfo) {
    return axiosInstance({
        url: "v1/users",
        method: "post",
        data: sysUser
    })
}

// 重置密码
export function resetPassword(userRequest: UserIDInfo) {
    return axiosInstance({
        url: "v1/users/reset",
        method: "post",
        data: userRequest
    })
}

// 获取选定用户的信息
export function getUser(userRequest: UserIDInfo) {
    return axiosInstance({
        url: "v1/users/id",
        method: "post",
        data: userRequest
    })
}

// 设置授权
export function setRole(sysUserRole: UserRole) {
    return axiosInstance({
        url: "v1/users/role",
        method: "put",
        data: sysUserRole
    })
}

// 更新用户启用状态
export function updateStatus(sysUserStatus: UserStatus) {
    return axiosInstance({
        url: "v1/users/status",
        method: "put",
        data: sysUserStatus
    })
}

// 修改用户信息
export function updateSysUser(userRequest: AddUpdateUserInfo) {
    return axiosInstance({
        url: "v1/users",
        method: "put",
        data: userRequest
    })
}

// 删除用户
export function deleteSysUsers(userRequest: UserIDInfo) {
    return axiosInstance({
        url: "v1/users",
        method: "delete",
        data: userRequest
    })
}

