import axios from 'axios'

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
        captcha_image: string;
        captcha_id: string;
        token: string;
      // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const axiosInstance = axios.create({
    timeout: 1000 * 1000000,
    withCredentials: true,
    baseURL: '/api',
})


// response 拦截器
axiosInstance.interceptors.response.use(response=>{
    const res = response.data    
    if(response.status === 200) {
        return res
    } else if (response.status === 401) {
        alert(res.error_message);
    } else if (response.status === 422) {
        alert(res.message);
    }
})


export default axiosInstance