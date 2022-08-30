import request from '@/utils/request'

// 登录页相关接口
export const SaPropaganda = {
  query(data) {
    // 用户查询
    return request({
      url: '/publicityWork.do',
      method: 'post',
      data
    })
  },
  publicityWork(data) {
    // 用户查询
    return request({
      url: '/publicityWork.do',
      method: 'post',
      data
    })
  }
}
