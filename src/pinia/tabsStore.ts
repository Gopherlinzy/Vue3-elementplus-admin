import { defineStore } from 'pinia'
import { Itab } from './type'

export interface TabState {
    tabsList: Array<Itab>,
    contextMenuTabId: string
}

// 定义容器
export const tabsStore = defineStore('tabs', {
    state: () => ({
        tabsList: [],
        contextMenuTabId: ''
    }),
    getters: {
        getAddTab(state: TabState) {
            return state.tabsList
        }
    },
    actions: {
        // 添加tab
        addTab(tab: Itab) {
            const isSome = this.tabsList.some((item) => item.path == tab.path)
            if (!isSome) {
                this.tabsList.push(tab)
            }
        },

        // 删除tab
        closeCurrentTab(targetName: string) {
            const index = this.tabsList.findIndex((item) => item.path == targetName)
            this.tabsList.splice(index, 1)
        },

        // 右键打开菜单保存path
        saveCurContextTabId(curtextMenuTabId: string) {
            this.contextMenuTabId = curtextMenuTabId
        },

        // 删除所有tab
        closeAllTabs() {
            const tab: Itab = {
                path: '/index',
                title: '首页'
            }
            this.tabsList = [tab]
            sessionStorage.removeItem('TABS_ROUTES')
        },

        // 删除其它tab
        closeOtherTabs(par: string) {
            if (par == 'other') {
                this.tabsList = this.tabsList.filter((item) => item.path == this.contextMenuTabId)
            } else if (par == 'left') {
                const index = this.tabsList.findIndex((item) => item.path == this.contextMenuTabId)

                this.tabsList.splice(0, index)
            } else if (par == 'right') {
                const index = this.tabsList.findIndex((item) => item.path == this.contextMenuTabId)
                this.tabsList.splice(index + 1)
            }
        }
    },

})