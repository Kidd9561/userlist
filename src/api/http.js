
import axios from 'axios';
import router from "../router/index";
import {ElMessage} from "element-plus"


const toLogin = () => {
    router.replace({
        path: '/login'
    });
}


/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            localStorage.removeItem('token');
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            this.$message.warning("404 not found")
            break;
        // 500 server error
        case 500:
            this.$message.warning("500 server error")
            break;
        default:
            console.log(other);
    }}

// 创建axios实例
var instance = axios.create({
    baseURL: 'http://dev.zhh0000zhh.com:36005/v1/',
    timeout: 1000 * 12
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        token && (config.headers.token = token);
        return config;
    },
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res =>{
        if(typeof res.data === "string"){
            return Promise.resolve(res.data)
        }
        if(res.data.code === "200"){
            return Promise.resolve(res.data)
        } else {
            ElMessage({
                message: res.data.message || res.data.desc,
                type: "warning"
            })
        }
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.code, response.desc);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            return Promise.reject(error);
        }
    });

export default instance;
