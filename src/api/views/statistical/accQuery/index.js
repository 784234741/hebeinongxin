import request from '@/utils/request'

// 登录页相关接口
export const SaAccQuery = {
  query(data) {
    // 用户查询
    return request({
      url: '/unitAccStatistics.do',
      method: 'post',
      data
    })
  }
}
