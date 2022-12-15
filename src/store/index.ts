import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { tabStore, TabState } from './modules/tabs'
import { AuthState, authStore } from './modules/auth'

import { menuStore, MenuState } from './modules/menu'
import { buttonStore, ButtonState } from './modules/button'




export interface RootState {
    tabStore: TabState,
    authStore: AuthState,
    menuStore: MenuState,
    buttonStore: ButtonState,

}

export interface RootState {
    tabStore: TabState,
    authStore: AuthState
}

export const key: InjectionKey<Store<RootState>> = Symbol()


export const store: Store<RootState> = createStore({
    modules: {
        tabStore,
        authStore,
        menuStore,
        buttonStore,
    }
})

// 自定义组合式函数
export function useStore() {
    return baseUseStore(key)
}