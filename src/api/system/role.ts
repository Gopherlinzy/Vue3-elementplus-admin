import axiosInstance from "../axios";


// interface RoleInfo {
//     id: string
//     role_name: string
//     des: string
// }

// interface RoleID {
//     id: string
// }

// interface RoleStatus {
//     id: string
//     status: string
// }

// interface RolePermissions {
//     id: string
//     permissions: Array<string>
// }



// 获取所有角色
export function getAllRoles() {
    return axiosInstance({
        url: "v1/roles",
        method: "get"
    })
}

// 获取角色所有权限
export function getRoleAllPolicies(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles/policies",
        method: "post",
        data: roleRequest
    })
}

// 获取指定角色
export function getRole(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles/id",
        method: "post",
        data: roleRequest
    })
}

// 获取指定角色的 menus 菜单
export function getRoleMenus(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles/menus",
        method: "post",
        data: roleRequest
    })
}

// 添加角色
export function addRole(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles",
        method: "post",
        data: roleRequest
    })
}

// 修改角色信息
export function updateRole(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles",
        method: "put",
        data: roleRequest
    })
}

// 更新角色状态
export function updateRoleStatus(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles/status",
        method: "put",
        data: roleRequest
    })
}

// 更新角色菜单权限
export function updateRoleMenuPermissions(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles/menuPermissions",
        method: "put",
        data: roleRequest
    })
}

// 删除角色
export function deleteRole(roleRequest: object) {
    return axiosInstance({
        url: "v1/roles",
        method: "delete",
        data: roleRequest
    })
}
