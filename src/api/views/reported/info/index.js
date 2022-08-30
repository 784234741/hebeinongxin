import request from '@/utils/request'

export const ReportInfo = {
  reportInfo(data) {
    return request({
      url: '/reportInfo.do',
      method: 'post',
      data
    })
  },
  accInfo(data) {
    return request({
      url: '/accInfo.do',
      method: 'post',
      data
    })
  },
  cusInfo(data) {
    return request({
      url: '/cusInfo.do',
      method: 'post',
      data
    })
  },
  nationInfo(data) {
    return request({
      url: '/externalDataController.do',
      method: 'post',
      data
    })
  }
}
