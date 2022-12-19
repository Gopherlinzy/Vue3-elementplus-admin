import { defineStore } from 'pinia'
import { UserType } from "./type";
import { login, loginByToken } from '@/api/auth'
import router from '@/router'


export interface AuthState {
    token: string,
    userInfo: UserType,
    roles: string[],
}

// 定义容器
export const authStore = defineStore('auth', {
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
    getters: {
        getToken(state: AuthState) {
            return state.token
        }
    },

    actions: {
        // 账号密码登录
        login(requestUser: API.loginForm) {
            login(requestUser).then(result => {
                // console.log(requestUser);
                location.reload()
                this.userInfo = result.data
                this.token = result.token
                sessionStorage.token = result.token
                // console.log(result.permissions);
                // store.dispatch('menuStore/generateSystemMenus', result.permissions)
                // store.dispatch('buttonStore/generateButtons', result.apiPolicies)
                router.push({ path: '/index' })
            })
        },

        // token检测
        loginToken() {
            loginByToken().then(result => {
                // console.log(result);
                this.token = result.token
                sessionStorage.token = result.token
                this.userInfo = result.data
                // store.dispatch('menuStore/generateSystemMenus', result.permissions)
                // store.dispatch('buttonStore/generateButtons', result.apiPolicies)
                if (result.success) {
                    router.push({ path: '/index' })
                }
            }).catch(() => {
                localStorage.removeItem('token')
            })
        }
    }
})