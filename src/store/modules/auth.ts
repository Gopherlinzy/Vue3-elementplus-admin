import { Module } from "vuex";
import { RootState } from "../index";
import { login } from '@/api/auth'

export interface AuthState {
    token: string,
    userInfo: object,
    roles: string[],
}



export const authStore: Module<AuthState, RootState> = {
    namespaced: true,
    state:(): AuthState => ({
        token: '',
        userInfo: { },
        roles: []
    }),

    mutations: {
        addToken(state: AuthState, token: string) {
            state.token = token
            sessionStorage.token = token
        },
        delToken(state: AuthState) {
            state.token = ''
            sessionStorage.removeItem('token')
        }
    },

    getters: {
        getToken(state: AuthState) {
            return state.token
        }
    },

    actions: {
        // 账号密码登录
        login({commit,state,dispatch},requestUser) {
            login(requestUser).then(result => {
                if (sessionStorage.getItem('token')) {
                    commit('delToken')
                }
                state.userInfo = result
                commit('addToken', result.token)
                // localStorage.setItem('token', result.token)
            })
        }
    }
}