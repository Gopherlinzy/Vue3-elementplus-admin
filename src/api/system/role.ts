import axiosInstance from "../axios";


interface RoleInfo {
    id: string
    role_name: string
    des: string
}

interface RoleID {
    id: string
}

interface RoleStatus {
    id: string
    status: string
}

// 获取指定角色
export function getRole(roleRequest: RoleID) {
    return axiosInstance({
        url: "v1/roles/id",
        method: "post",
        data: roleRequest
    })
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
export function updateRole(roleRequest: RoleInfo) {
    return axiosInstance({
        url: "v1/roles",
        method: "put",
        data: roleRequest
    })
}

// 更新角色状态
export function updateRoleStatus(roleRequest: RoleStatus) {
    return axiosInstance({
        url: "v1/roles/status",
        method: "put",
        data: roleRequest
    })
}

// 删除角色
export function deleteRole(roleRequest: RoleID) {
    return axiosInstance({
        url: "v1/roles",
        method: "delete",
        data: roleRequest
    })
}
