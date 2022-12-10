import goodsRouter from './goods'
import homeRouter from './home'
import orderRouter from './order'
import systemRouter from './system'
import { RouteRecordRaw } from 'vue-router'

export const asyncRoutes: RouteRecordRaw[] = [
    homeRouter,
    systemRouter,
    goodsRouter,
    orderRouter,
]