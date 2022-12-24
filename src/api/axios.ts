import axios, { AxiosRequestConfig } from 'axios'
import 'element-plus/es/components/message/style/css'
import { ElMessageBox, ElMessage } from 'element-plus'


// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
        captcha_image: string;
        captcha_id: string;
        token: string;
        success: boolean;
        pager: Array<never>;
        // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const axiosInstance = axios.create({
    timeout: 1000 * 1000000,
    withCredentials: true,
    baseURL: import.meta.env.VITE_URL,
    // baseURL: '/api'
})

// 请求拦截器
axiosInstance.interceptors.request.use((requestInfo: AxiosRequestConfig) => {
    // 如果用户已登录，统一给接口设置token
    if (requestInfo.headers) {
        const token = sessionStorage.getItem('token')
        // console.log(token);
        if (token) {
            requestInfo.headers['Authorization'] = `Bearer ${token}`
        }
        requestInfo.headers['Content-Type'] = 'application/json;charset=utf-8'
    }

    // 处理完之后一定要把config 返回，否则请求发不出去
    return requestInfo
}, function (err) {
    return Promise.reject(err)
})

// response 拦截器
axiosInstance.interceptors.response.use(
    // 在2xx范围内的任何状态代码都会触发此函数，这里主要用于处理响应数据
    response => {
        return response.data
    },
    // 任何超出2xx范围的状态码都会触发此函数，这里主要用于处理响应错误
    error => {
        const status = error.response.status
        const message = error.response.data.message
        // console.log(status);
        if (status === 401) { // token 解析失败或者登录失败，需要删除token
            console.log(error.response.data);

            ElMessageBox.alert(message, "token 解析失败或者登录失败")
            // sessionStorage.removeItem('token')
            sessionStorage.clear()
        } else if (status === 404) { // 资源不存在
            // ElMessageBox.alert(message, "请求资源不存在")
            ElMessage.error(message)
        } else if (status === 403) { // 没有权限
            ElMessage.error('权限不足')
        }
        else if (status < 500) { // 请求错误
            if (error.response.data.errors) {
                const errors = error.response.data.errors
                ElMessageBox.alert(message, "请求错误")
                console.log(errors);
            } else {
                ElMessageBox.alert(message, error.response.data.error)
                // console.log(error.response.data);
            }
        }
        else if (status >= 500) { // 服务端异常
            ElMessageBox.alert(message, error.response.data.error)
        }
        // 将未处理的异常往外抛
        return Promise.reject(error)
    })


export default axiosInstance