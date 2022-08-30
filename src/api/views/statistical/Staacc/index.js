import request from '@/utils/request'

export const Staacc = {
  query(data) {
    return request({
      url: '/accServiceManage.do',
      method: 'post',
      data
    })
  },
  add(data) {
    return request({
      url: '/accServiceManage.do',
      method: 'post',
      data
    })
  },
  del(data) {
    return request({
      url: '/accServiceManage.do',
      method: 'post',
      data
    })
  },
  export(data) {
    return request({
      url: '/accServiceManage.do',
      method: 'post',
      data
    })
  }
}
