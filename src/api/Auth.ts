
import axiosInstance from "./axios";

// 获取验证码
export function getCode() {
    return axiosInstance({
        url:'v1/auth/verify-codes/captcha',
        method:'get'
    })
}

// 用户密码登录
export function login(requestUser:object) {
    return axiosInstance({
        url:'v1/auth/login/using-password',
        method:'post',
        data:requestUser
    })
}

//  通过token登录
export function loginByToken(token:string) {
    return axiosInstance({
        url:'v1/auth/loginByToken?token=' + token,
        method:'post',
    })
}



