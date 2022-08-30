import request from '@/utils/request'

// 登录页相关接口
export const SysAssessment = {
  accManageCheck(data) { // 用户查询
    return request({
      url: '/accManageCheck.do',
      method: 'post',
      data
    })
  }
}
