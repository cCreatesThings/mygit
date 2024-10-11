import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

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
    if (err.response?.status === 401) {
      useUserStore().clearProfile()
      router.push('/login')
      ElMessage.error(err.message || '登录过期，请重新登录')
      return Promise.reject(err)
    }
    ElMessage.error(
      err.message || err?.response.data.error_description || '业务异常'
    )
    return Promise.reject(err)
  }
)

export default request
