import request from '@/utils/request'
// 登录页相关接口
export const Login = {
  login(data) { // 登录
    return request({
      url: '/loginController.do',
      method: 'post',
      data
    })
  },
  timeCheck(data) { // 客户访问时间校验
    return request({
      url: '/LoginTimeCheck.do',
      method: 'post',
      data
    })
  },
  getInfo() { // 用户信息
    return request({
      url: '/user/info',
      method: 'get',
      params: { }
    })
  },
  // 退出
  logout(data) {
    return request({
      url: '/logout.do',
      method: 'post',
      data
    })
  }
}
