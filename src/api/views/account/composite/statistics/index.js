import request from '@/utils/request'

// 登录页相关接口
export const SysReconciliationInfo = {
  reconciliationInfo(data) {
    // 用户查询
    return request({
      url: '/reconciliationInfo.do',
      method: 'post',
      data
    })
  }
}
