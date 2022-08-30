import axios from 'axios'
import { MessageBox } from 'element-ui'
import { commonBlank } from '@/utils/common'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'
// import qs from 'qs'

// 新建一个 axios 实例
const service = axios.create({
  // `baseURL` 将自动加在 `url` 前面，可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000 // 请求超时(毫秒)
  // withCredentials: true, // 当跨域请求时发送cookie
  // headers: { 'content-type': 'application/x-www-form-urlencoded' } // `headers` 是即将被发送的自定义请求头
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 让每个请求携带 token
      // ['X-Token'] 是一个自定义头键
      // 请根据实际情况进行修改
      config.headers['Authorization'] = getToken()
    }
    // 请求头配置
    // config.headers.Accept = 'application/x-www-form-urlencoded'
    // 参数传递格式化
    // config.transformRequest = [
    //   function(data) {
    //     return qs.stringify(data, { arrayFormat: 'BRACKETS' })
    //   }
    // ]
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过自定义代码确定请求状态
   * 可以通过HTTP状态码来判断状态
   */
  (response) => {
    // 对响应数据做点什么
    if (commonBlank(response)) {
      response = {}
    }
    const { status, statusText, headers } = response
    // 如果后台token过期，之后接口会在相应头返回authorization字段，前台再重设token
    if (!commonBlank(headers.authorization)) {
      setToken(headers.authorization)
      store.commit('SET_TOKEN', headers.authorization)
    }
    if (status === 200) {
      // 请求正常
      const res = response.data
      // 如果定制代码不是200，则判定为错误。
      if (res.retCode !== 200 && res.retCode !== '200') {
        // 508:非法token;512:其他客户端登录;50014:Token过期;
        if (res.retCode === 508 || res.retCode === 512 || res.retCode === 514) {
          // 重新登录提示
          MessageBox.confirm(`${res.retMsg}，请重新登录`, '确认注销', {
            confirmButtonText: '重新登录',
            showClose: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        } else if (res.retCode === 410) {
          // 服务端Token更新
          const { token } = res.data
          setToken(token) // 重置token
          store.commit('SET_TOKEN', token) // 重置 token
          return res
        } else {
          MessageBox.alert(
            '后台报错：' + res.retCode + ' - ' + res.retMsg || 'Error',
            {
              confirmButtonText: '确定'
            }
          )
          // Message({
          //   message: '后台报错：' + res.retCode + ' - ' + res.retMsg || 'Error',
          //   type: 'error',
          //   duration: 5 * 1000
          // })
        }
        return Promise.reject(new Error(res.retMsg || 'Error'))
      } else {
        return res
      }
    } else {
      // 重新登录提示
      MessageBox.confirm(`${statusText}，请重新登录`, '确认注销', {
        confirmButtonText: '重新登录',
        showClose: false,
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
  },
  (error) => {
    // 对响应错误做点什么
    const { status, statusText } = error.response
    if (error.response.status === 401 || error.response.status === '401') {
      // 重新登录提示
      MessageBox.confirm(`${status}：${statusText}，请重新登录`, '确认注销', {
        confirmButtonText: '重新登录',
        showClose: false,
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      // Message({
      //   message: `后台报错：${status} - ${statusText}`,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      MessageBox.alert(`后台报错：${status} - ${statusText}`, {
        confirmButtonText: '确定'
      })
      return Promise.reject(error) // 返回一个带有拒绝原因的Promise对象,error表示Promise被拒绝的原因。
    }
  }
)

export default service
