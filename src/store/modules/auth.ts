import { Module } from "vuex";
import { RootState } from "../index";
import { login, loginByToken } from '@/api/auth'
import router from '@/router'
import { UserType } from "../type";



export interface AuthState {
    token: string,
    userInfo: UserType,
    roles: string[],
}



export const authStore: Module<AuthState, RootState> = {
    namespaced: true,
    state: (): AuthState => ({
        token: '',
        userInfo: {
            name: '',
            avatar: '',
            city: '',
            rolename: '',
        },
        roles: []
    }),

    mutations: {
        addToken(state: AuthState, token: string) {
            state.token = token
            sessionStorage.token = token
        },
        addUserInfo(state: AuthState, userinfo: UserType) {
            state.userInfo = userinfo
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
                state.userInfo = result.data
                commit('addToken', result.token)
                router.push({ path: '/index' })
            })
        },

        // token检测
        loginToken({ commit, state, dispatch }, token) {
            commit('addToken', token)
            loginByToken(token).then(result => {
                state.userInfo = result.data
                if (result.success) {
                    router.push({ path: '/index' })
                }
            }).catch(() => {
                localStorage.removeItem('token')
            })
        }
    }
}