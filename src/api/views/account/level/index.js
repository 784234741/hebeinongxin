import request from '@/utils/request'

export const RiskLevel = {
  riskLevel(data) {
    return request({
      url: '/riskLevel.do',
      method: 'post',
      data
    })
  }
}
