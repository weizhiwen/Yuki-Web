import router from '@/router/index.js'
import {getToken} from '@/utils/cookie.js'
import axios from 'axios'
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
    baseURL: import.meta.env.VITE_PROXY,
    timeout: 10000,
})

// request 拦截器
service.interceptors.request.use(req => {
    // 是否需要设置token
    const isToken = (req.headers || {}).isToken === false
    // if (req.needAuth && req.needAuth === false) {
    //
    // }
    if (getToken() && !isToken) {
        req.headers['Authorization'] = 'Bearer ' + getToken();
    }
    // if (req.method === 'get') {
    //     if (req.params) {

    //     }
    // } else if (req.method === 'post' || req.method === 'put' || req.method === 'patch') {
    //     if (req.headers 
    //     const requestId = {
    //         url: req.url,
    //         data: typeof req.data === 'object' ? JSON.stringify(req.data) : req.data,
    //         time: new Date().getTime()
    //     }

    // }
    return req
}, error => {
    console.log(error)
    Promise.reject(error)
})

const errorCode = {
    '401': '认证失败，请先登录',
    '403': '没有权限操作',
    '404': '访问的资源不存在',
    '500': '系统未知错误，请联系管理员'
}

let isNeedLoginAgainShow = false;

// response 拦截器
service.interceptors.response.use(res => {
        let result = res.data;
        const code = result.code || 200
        const msg = errorCode[code] || result.msg || errorCode['default']
        if (code === 401) {
            if (!isNeedLoginAgainShow) {
                isNeedLoginAgainShow = true;
                ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                    confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning'
                }).then(() => {
                    isNeedLoginAgainShow = false;
                    router.push('/login')
                    // 路由到登录页面
                }).catch(() => {
                    isNeedLoginAgainShow = false;
                    // 停留在当前页面
                });
            }
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            ElMessage({message: msg, type: 'error'})
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            ElNotification.error({title: msg})
            return Promise.reject('error')
        } else {
            return Promise.resolve(result.data)
        }
    },
    error => {
        console.log('err' + error)
        let {message} = error;
        if (message === "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        ElMessage({message: message, type: 'error', duration: 5 * 1000})
        return Promise.reject(error)
    }
)

export default service