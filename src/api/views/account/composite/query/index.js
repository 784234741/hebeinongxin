import request from '@/utils/request'

// 登录页相关接口
export const SysAccInfo = {
  accInfo(data) {
    // 用户查询
    return request({
      url: '/accInfo.do',
      method: 'post',
      data
    })
  },
  annualInfo(data) {
    // 年检查询
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
  cusInfo(data) {
    // 报备查询
    return request({
      url: '/cusInfo.do',
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
  },
  uploadFile(data) {
    return request({
      url: '/uploadFile.do',
      method: 'post',
      data
    })
  }
}
