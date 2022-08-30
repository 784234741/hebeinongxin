import request from '@/utils/request'

// 登录页相关接口
export const SaPerAcc = {
  query(data) {
    // 用户查询
    return request({
      url: '/accTotalOpen.do',
      method: 'post',
      data
    })
  }
}
