import request from '@/utils/request'

// 登录页相关接口
export const SysOrgan = {
  organInfo(data) { // 用户查询
    return request({
      url: '/organInfo.do',
      method: 'post',
      data
    })
  }
}
