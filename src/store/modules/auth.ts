import { Module } from "vuex";
import { RootState } from "../index";
import { login, loginByToken } from '@/api/auth'
import router from '@/router'
import { UserType } from "../type";
<<<<<<< HEAD
import { store } from "@/store";
=======

>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7


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
                // console.log(requestUser);
                location.reload()
                state.userInfo = result.data
                commit('addToken', result.token)
<<<<<<< HEAD
                // console.log(result.permissions);
                store.dispatch('menuStore/generateSystemMenus', result.permissions)
                store.dispatch('buttonStore/generateButtons', result.apiPolicies)
=======
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
                router.push({ path: '/index' })
            })
        },

        // token检测
        loginToken({ commit, state, dispatch }, token) {
<<<<<<< HEAD
            loginByToken().then(result => {
                // console.log(result);
                commit('addToken', token)
                state.userInfo = result.data
                store.dispatch('menuStore/generateSystemMenus', result.permissions)
                store.dispatch('buttonStore/generateButtons', result.apiPolicies)
=======
            commit('addToken', token)
            loginByToken(token).then(result => {
                state.userInfo = result.data
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
                if (result.success) {
                    router.push({ path: '/index' })
                }
            }).catch(() => {
                localStorage.removeItem('token')
            })
        }
    }
}