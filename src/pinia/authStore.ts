import { defineStore } from 'pinia'
import { UserType } from "./type";
import { login, loginByToken } from '@/api/auth'
import router from '@/router'
import { menuStore } from './menuStore';
import { buttonStore } from './buttonStore';

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
                // location.reload()
                this.userInfo = result.data
                this.token = result.token
                sessionStorage.setItem('token', result.token)
                // console.log(sessionStorage.getItem('token'));

                // console.log(result.permissions);
                const userMenuStore = menuStore()
                userMenuStore.generateSystemMenus(result.permissions)
                const userButtonStore = buttonStore()
                userButtonStore.generateButtons(result.apiPolicies)
                router.push({ path: '/index' })
            })
        },

        // token检测
        loginToken() {
            loginByToken().then(result => {
                // console.log(result);
                this.token = result.token
                this.userInfo = result.data
                const userMenuStore = menuStore()
                userMenuStore.generateSystemMenus(result.permissions)
                const userButtonStore = buttonStore()
                userButtonStore.generateButtons(result.apiPolicies)
                // console.log(result);

                if (result.success) {
                    router.push({ path: '/index' })
                }
            }).catch(() => {
                sessionStorage.removeItem('token')
            })
        },

        async changePermission(permissions: object[], apiPolicies: object[]) {
            const userMenuStore = menuStore()
            await userMenuStore.generateSystemMenus(permissions)
            const userButtonStore = buttonStore()
            await userButtonStore.generateButtons(apiPolicies)
        }
    }
})