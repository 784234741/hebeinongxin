import request from '@/utils/request'

// 登录页相关接口
export const EntSatisfied = {
  query(data) {
    // 用户查询
    return request({
      url: '/entAccSatisfaction.do',
      method: 'post',
      data
    })
  },
  add(data) {
    return request({
      url: '/entAccSatisfaction.do',
      method: 'post',
      data
    })
  },
  del(data) {
    return request({
      url: '/entAccSatisfaction.do',
      method: 'post',
      data
    })
  },
  export(data) {
    return request({
      url: '/entAccSatisfaction.do',
      method: 'post',
      data
    })
  }
}
