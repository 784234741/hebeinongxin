import request from '@/utils/request'

export const RepSys = {
  init(data) {
    return request({
      url: '/cmModularController.do',
      method: 'post',
      data
    })
  },
  query(data) {
    return request({
      url: '/cmModularController.do',
      method: 'post',
      data
    })
  },
  add(data) {
    return request({
      url: '/cmModularController.do',
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: '/cmModularController.do',
      method: 'post',
      data
    })
  },
  del(data) {
    return request({
      url: '/cmModularController.do',
      method: 'post',
      data
    })
  },
  source(data) {
    return request({
      url: '/externalDataController.do',
      method: 'post',
      data
    })
  }
}
