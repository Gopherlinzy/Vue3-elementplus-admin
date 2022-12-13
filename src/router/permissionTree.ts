import i18n from '@/i18n';
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
        title: i18n.global.t('menus.wIndex'),
        permission: "system:index",
    },
    {
        id: 2,
        title: i18n.global.t('menus.wSuperAdmin'),
        permission: "system:superAdmin",
        children: [
            {
                id: 3,
                title: i18n.global.t('menus.wRoleManger'),
                permission: "system:superAdmin:role",
            },
            {
                id: 4,
                title: i18n.global.t('menus.wApiManger'),
                permission: 'system:superAdmin:api'
            },
            {
                id: 5,
                title: i18n.global.t('menus.wMenuManger'),
                permission: "system:superAdmin:menu"

            },
            {
                id: 6,
                title: i18n.global.t('menus.wUserManger'),
                permission: "system:superAdmin:user"
            },
            {
                id: 7,
                title: i18n.global.t('menus.wSystemConfig'),
                permission: "system:superAdmin:sysSetting"
            },
        ]
    },
    {
        id: 8,
        title: i18n.global.t('menus.wOrderManger'),
        permission: "system:order",
        children: [
            {
                id: 9,
                title: i18n.global.t('menus.wOrderQuery'),
                permission: 'system:order:orderInfo'
            },
            {
                id: 10,
                title: i18n.global.t('menus.worderProcess'),
                permission: 'system:order:orderManage'
            }
        ]
    },
    {
        id: 11,
        title: i18n.global.t('menus.wGoodsManger'),
        permission: "system:goods",
        children: [
            {
                id: 12,
                title: i18n.global.t('menus.wGoodsCategory'),
                permission: 'system:goods:goodsCategory'
            },
            {
                id: 13,
                title: i18n.global.t('menus.wGoodsInfo'),
                permission: 'system:goods:goodsInfo',
            }
        ]
    },
]

export default permissionTree
