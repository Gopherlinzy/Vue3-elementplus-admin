import axiosInstance from "../axios";


interface RoleInfo {
    id: string
    role_name: string
    des: string
}

// 获取所有角色
export function getAllRoles() {
    return axiosInstance({
        url: "v1/roles",
        method: "get"
    })
}

// 添加角色
export function addRole(roleRequest: RoleInfo) {
    return axiosInstance({
        url: "v1/roles",
        method: "post",
        data: roleRequest
    })
}

// 修改角色信息
export function updateSysUser(roleRequest: RoleInfo) {
    return axiosInstance({
        url: "v1/roles",
        method: "put",
        data: roleRequest
    })
}

// 删除角色
export function deleteSysUsers(roleRequest: RoleInfo) {
    return axiosInstance({
        url: "v1/roles",
        method: "delete",
        data: roleRequest
    })
}
