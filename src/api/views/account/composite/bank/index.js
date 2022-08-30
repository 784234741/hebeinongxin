import request from '@/utils/request'

// 登录页相关接口
export const SysCusInfo = {
  cusInfo(data) {
    // 用户查询
    return request({
      url: '/cusInfo.do',
      method: 'post',
      data
    })
  },
  accInfo(data) {
    // 用户查询
    return request({
      url: '/accInfo.do',
      method: 'post',
      data
    })
  },
  annualInfo(data) {
    // 用户查询
    return request({
      url: '/annualInfo.do',
      method: 'post',
      data
    })
  },
  reportInfo(data) {
    // 报备查询
    return request({
      url: '/reportInfo.do',
      method: 'post',
      data
    })
  },
  multiCheck(data) {
    // 报备查询
    return request({
      url: '/multiCheck.do',
      method: 'post',
      data
    })
  }
}
