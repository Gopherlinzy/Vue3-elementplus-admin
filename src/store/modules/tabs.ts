import { Module } from "vuex";
import { RootState } from '../index'
import { Itab } from '../type'


export interface TabState {
    tabsList: Array<Itab>,
    contextMenuTabId: string
}

export const tabStore: Module<TabState, RootState> = {
    namespaced: true,
    state: {
        tabsList: [],
        contextMenuTabId: ''
    },

    mutations: {
        // 添加tab
        addTab(state: TabState, tab: Itab) {
            const isSome = state.tabsList.some((item) => item.path == tab.path)
            if (!isSome) {
                state.tabsList.push(tab)
            }
        },

        // 删除tab
        closeCurrentTab(state: TabState, targetName: string) {
            const index = state.tabsList.findIndex((item) => item.path == targetName)
            state.tabsList.splice(index, 1)
        },

        // 右键打开菜单保存path
        saveCurContextTabId(state: TabState, curtextMenuTabId) {
            state.contextMenuTabId = curtextMenuTabId
        },

        // 删除所有tab
        closeAllTabs(state: TabState) {
            state.tabsList = []
            sessionStorage.removeItem('TABS_ROUTES')
        },

        // 删除其它tab
        closeOtherTabs(state: TabState, par: string) {
            if (par == 'other') {
                state.tabsList = state.tabsList.filter((item) => item.path == state.contextMenuTabId)
            } else if (par == 'left') {
                const index = state.tabsList.findIndex((item) => item.path == state.contextMenuTabId)

                state.tabsList.splice(0, index)
            } else if (par == 'right') {
                const index = state.tabsList.findIndex((item) => item.path == state.contextMenuTabId)
                state.tabsList.splice(index + 1)
            }
        }




    },

    getters: {
        getAddTab(state: TabState) {
            return state.tabsList
        }
    }
}
