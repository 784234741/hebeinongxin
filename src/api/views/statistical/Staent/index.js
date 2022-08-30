import request from '@/utils/request'

export const Staent = {
  query(data) {
    return request({
      url: '/accOpenMonitor.do',
      method: 'post',
      data
    })
  },
  export(data) {
    return request({
      url: '/accOpenMonitor.do',
      method: 'post',
      data
    })
  }
}
