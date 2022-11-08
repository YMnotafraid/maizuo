import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info':
      '"a":"3000","ch":"1002","v":"5.2.1","e":"16628803161957220891754497"'
  }
})
// 发送请求之前执行
http.interceptors.request.use(
  function (config) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 后台响应请求，在promise.then方法之前执行，可以给后台返回的数据中手动加上自定义的数据
http.interceptors.response.use(
  function (response) {
    Toast.clear()
    return response
  },
  function (error) {
    Toast.clear()
    return Promise.reject(error)
  }
)
export default http
