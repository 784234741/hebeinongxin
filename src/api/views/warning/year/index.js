import request from '@/utils/request'

export const WarningAnnualWarn = {
  annualWarn(data) {
    return request({
      url: '/annualWarn.do',
      method: 'post',
      data
    })
  }
}
