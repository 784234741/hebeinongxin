import request from '@/utils/request'

export const WarningPhoneMulti = {
  addrMulti(data) {
    return request({
      url: '/addrMulti.do',
      method: 'post',
      data
    })
  },
  phoneMulti(data) {
    return request({
      url: '/phoneMulti.do',
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
  }
}
