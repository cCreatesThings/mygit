import axios from 'axios'
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
    return response.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request
