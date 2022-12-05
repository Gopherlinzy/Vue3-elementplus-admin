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


// 修改密码
export function resetPassword(userPassword: ResetPassword) {
    return axiosInstance({
        url: "v1/users/password",
        method: "put",
        data: userPassword
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