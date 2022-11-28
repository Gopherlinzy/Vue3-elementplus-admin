import {createStore, useStore as baseUseStore, Store} from 'vuex'
import { InjectionKey } from 'vue'
import { tabStore,TabState } from './modules/tabs'

export interface RootState{
    tabStore:TabState
}

export const key : InjectionKey<Store<RootState>> = Symbol()


export const store:Store<RootState> = createStore({
    modules: {
        tabStore
    }
})

// 自定义组合式函数
export function useStore() {
    return baseUseStore(key)
}