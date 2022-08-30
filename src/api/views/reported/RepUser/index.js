import request from '@/utils/request'

export const RepUser = {
  query(data) {
    return request({
      url: '/reportUser.do',
      method: 'post',
      data
    })
  },
  add(data) {
    return request({
      url: '/reportUser.do',
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: '/reportUser.do',
      method: 'post',
      data
    })
  },
  del(data) {
    return request({
      url: '/reportUser.do',
      method: 'post',
      data
    })
  },
  reset(data) {
    return request({
      url: '/reportUser.do',
      method: 'post',
      data
    })
  },
  psdAuth(data) {
    return request({
      url: '/userController.do',
      method: 'post',
      data
    })
  },
  fileDownload(data) {
    return request({
      url: '/fileDownload.do',
      method: 'post',
      data
    })
  }
}
