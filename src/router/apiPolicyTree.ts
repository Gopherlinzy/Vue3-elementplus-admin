/**
 * 权限树 授权的时候使用 细粒度
 label: 'title',
 children: 'children'

 apiPolicy: path:method 作为key
 */
const apiPolicyTree = [
    {
        title: '角色管理组',
        apiPolicy: "rolesGroup",
        children: [
            {
                id: 1,
                title: '查询角色列表',
                apiPolicy: '/api/v1/roles:GET'
            },
            {
                id: 2,
                title: '新增角色数据',
                apiPolicy: '/api/v1/roles:POST'
            },
            {
                id: 3,
                title: '查询指定角色 id 信息',
                apiPolicy: '/api/v1/roles/id:POST'
            },
            {
                id: 4,
                title: '查询指定角色 id 的所有api权限',
                apiPolicy: '/api/v1/roles/apis:POST'
            },
            {
                id: 5,
                title: '查询指定角色 id 所有菜单权限',
                apiPolicy: '/api/v1/roles/menus:POST'
            },
            {
                id: 6,
                title: '更新角色信息',
                apiPolicy: '/api/v1/roles:PUT'
            },
            {
                id: 7,
                title: '更新角色的菜单权限',
                apiPolicy: '/api/v1/roles/menuPermissions:PUT'
            },
            {
                id: 8,
                title: '更新角色的api权限',
                apiPolicy: '/api/v1/roles/apiPolicy:PUT'
            },
            {
                id: 9,
                title: '更新角色启用状态',
                apiPolicy: '/api/v1/roles/status:PUT'
            },
            {
                id: 10,
                title: '删除角色',
                apiPolicy: '/api/v1/roles:DELETE'
            },
        ]
    },
    {
        title: '用户管理组',
        apiPolicy: 'userGroup',
        children: [
            {
                id: 11,
                title: '查询用户列表',
                apiPolicy: '/api/v1/users:GET'
            },
            {
                id: 12,
                title: '新增用户数据',
                apiPolicy: '/api/v1/users:POST'
            },
            {
                id: 13,
                title: '查询指定用户 id 的信息',
                apiPolicy: '/api/v1/users/id:POST'
            },
            {
                id: 14,
                title: "重置指定用户的密码为 '123456'",
                apiPolicy: '/api/v1/users/reset:POST'
            },
            {
                id: 15,
                title: '更新用户信息',
                apiPolicy: '/api/v1/users:PUT'
            },
            {
                id: 16,
                title: '更新用户启用状态',
                apiPolicy: '/api/v1/users/status:PUT'
            },
            {
                id: 17,
                title: '更新用户的角色权限',
                apiPolicy: '/api/v1/users/role:PUT'
            },
            {
                id: 18,
                title: '更新用户的邮箱',
                apiPolicy: '/api/v1/users/email:PUT'
            },
            {
                id: 19,
                title: '更新用户的手机号',
                apiPolicy: '/api/v1/users/phone:PUT'
            },
            {
                id: 20,
                title: '更新用户的密码',
                apiPolicy: '/api/v1/users/password:PUT'
            },
            {
                id: 21,
                title: '更新用户的头像',
                apiPolicy: '/api/v1/users/avatar:PUT'
            },
            {
                id: 22,
                title: '删除用户信息',
                apiPolicy: '/api/v1/users:DELETE'
            },
        ]
    },
    {
        title: '菜单管理',
        apiPolicy: 'menuGroup',
        children: [
            {
                id: 23,
                title: '查询菜单列表',
                apiPolicy: '/api/v1/menus:GET'
            },
            {
                id: 24,
                title: '查询菜单分页列表',
                apiPolicy: '/api/v1/menus/pag:GET'
            },
            {
                id: 25,
                title: '新增菜单信息',
                apiPolicy: '/api/v1/menus:POST'
            },
            {
                id: 26,
                title: '查询指定菜单 id 数据',
                apiPolicy: '/api/v1/menus/id:POST'
            },
            {
                id: 27,
                title: '更新菜单信息',
                apiPolicy: '/api/v1/menus:PUT'
            },
            {
                id: 28,
                title: '删除菜单信息',
                apiPolicy: '/api/v1/menus:DELETE'
            },
        ]
    },
    {
        title: 'api管理',
        apiPolicy: 'apiGroup',
        children: [
            {
                id: 29,
                title: '查询api列表',
                apiPolicy: '/api/v1/apis:GET'
            },
            {
                id: 30,
                title: '查询api分页列表',
                apiPolicy: '/api/v1/apis/pag:GET'
            },
            {
                id: 31,
                title: '新增api信息',
                apiPolicy: '/api/v1/apis:POST'
            },
            {
                id: 32,
                title: '查询指定api id 数据',
                apiPolicy: '/api/v1/apis/id:POST'
            },
            {
                id: 33,
                title: '更新api信息',
                apiPolicy: '/api/v1/apis:PUT'
            },
            {
                id: 34,
                title: '删除api信息',
                apiPolicy: '/api/v1/apis:DELETE'
            },
        ]
    },
]


export default apiPolicyTree