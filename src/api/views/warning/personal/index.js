import request from '@/utils/request'

export const WarningLegalMulti = {
  legalMulti(data) {
    return request({
      url: '/legalMulti.do',
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
  accInfo(data) {
    return request({
      url: '/accInfo.do',
      method: 'post',
      data
    })
  },
  annualInfo(data) {
    return request({
      url: '/annualInfo.do',
      method: 'post',
      data
    })
  },
  reportInfo(data) {
    return request({
      url: '/reportInfo.do',
      method: 'post',
      data
    })
  },
  uploadFile(data) {
    return request({
      url: '/uploadFile.do',
      method: 'post',
      data
    })
  }
}
