import { Module } from "vuex";
import { RootState } from "../index";
import { login, loginByToken } from '@/api/auth'
import router from '@/router'

export interface AuthState {
    token: string,
    userInfo: object,
    roles: string[],
}



export const authStore: Module<AuthState, RootState> = {
    namespaced: true,
    state: (): AuthState => ({
        token: '',
        userInfo: {},
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
        login({ commit, state, dispatch }, requestUser) {
            login(requestUser).then(result => {
                if (sessionStorage.getItem('token')) {
                    commit('delToken')
                }
                state.userInfo = result
                commit('addToken', result.token)
                // localStorage.setItem('token', result.token)
            })
        },

        // token检测
        loginToken({ commit, state, dispatch }, token) {
            commit('addToken', token)
            loginByToken(token).then(result => {
                if (result.success) {
                    router.push({ path: '/index' })
                }
            }).catch(() => {
                localStorage.removeItem('token')
            })
        }
    }
}