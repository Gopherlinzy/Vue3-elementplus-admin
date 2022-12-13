/**
 * 权限树 授权的时候使用 细粒度
 id: number,
 label: 'title',
 children: 'children'

 permission作为key
 */
const permissionTree = [
    {
        id: 1,
        title: '首页',
        permission: "system:index",
    },
    {
        id: 2,
        title: '超级管理员',
        permission: "system:superAdmin",
        children: [
            {
                id: 3,
                title: '角色管理',
                permission: "system:superAdmin:role",
            },
            {
                id: 4,
                title: 'API管理',
                permission: 'system:superAdmin:api'
            },
            {
                id: 5,
                title: '菜单管理',
                permission: "system:superAdmin:menu"

            },
            {
                id: 6,
                title: '用户管理',
                permission: "system:superAdmin:user"
            },
            {
                id: 7,
                title: '系统设置',
                permission: "system:superAdmin:sysSetting"
            },
        ]
    },
    {
        id: 8,
        title: '订单管理',
        permission: "system:order",
        children: [
            {
                id: 9,
                title: '订单查询',
                permission: 'system:order:orderInfo'
            },
            {
                id: 10,
                title: '订单管理',
                permission: 'system:order:orderManage'
            }
        ]
    },
    {
        id: 11,
        title: '商品管理',
        permission: "system:goods",
        children: [
            {
                id: 12,
                title: '商品种类',
                permission: 'system:goods:goodsCategory'
            },
            {
                id: 13,
                title: '商品信息',
                permission: 'system:goods:goodsInfo',
            }
        ]
    },
]

export default permissionTree
