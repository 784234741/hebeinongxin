import request from '@/utils/request'

export const WarningReportSupple = {
  reportSupple(data) {
    return request({
      url: '/reportSupple.do',
      method: 'post',
      data
    })
  }
}
