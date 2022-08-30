import request from '@/utils/request'

export const Staser = {
  query(data) {
    return request({
      url: '/smallAccOpen.do',
      method: 'post',
      data
    })
  },
  export(data) {
    return request({
      url: '/smallAccOpen.do',
      method: 'post',
      data
    })
  }
}
