import request from '@/utils/request'

export const Staper = {
  query(data) {
    return request({
      url: '/peoOpenSatisfaction.do',
      method: 'post',
      data
    })
  },
  add(data) {
    return request({
      url: '/peoOpenSatisfaction.do',
      method: 'post',
      data
    })
  },
  del(data) {
    return request({
      url: '/peoOpenSatisfaction.do',
      method: 'post',
      data
    })
  },
  export(data) {
    return request({
      url: '/peoOpenSatisfaction.do',
      method: 'post',
      data
    })
  }
}
