/**
 * 权限树 授权的时候使用 细粒度
 id: 'title',
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
                children: [
                    {
                        id: 14,
                        title: '添加商品',
                        permission: "system:goods:goodsInfo:add" // TODO 真正可以添加到数据库的权限值, 对应到具体的后台接口权限
                    },
                    {
                        id: 15,
                        title: '修改商品',
                        permission: "system:goods:goodsInfo:update"
                    }
                ]
            }
        ]
    },
]

export default permissionTree
