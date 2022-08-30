import request from '@/utils/request'

// 登录页相关接口
export const SaSituation = {
  query(data) {
    // 用户查询
    return request({
      url: '/accountStatistics.do',
      method: 'post',
      data
    })
  },
  Addquery(data) {
    // 用户查询
    return request({
      url: '/accountStatistics.do',
      method: 'post',
      data
    })
  }
}
