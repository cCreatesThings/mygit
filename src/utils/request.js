import axios from 'axios'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: 'https://gitee.com',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 错误响应处理
    if (response.status < 200 || response.status >= 300) {
      ElMessage.error(response.data.error_description || '业务异常')
      return Promise.reject(response.data)
    }
    return response.data
  },
  (err) => {
    // 401处理
    if (err.response.status === 401) {
      ElMessage.error('登录过期，请重新登录')
      return Promise.reject(err)
    }
    ElMessage.error(err.response.data.error_description || '业务异常')
    return Promise.reject(err)
  }
)

export default request
