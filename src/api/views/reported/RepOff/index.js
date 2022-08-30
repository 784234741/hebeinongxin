import request from '@/utils/request'

export const RepOff = {
  query(data) {
    return request({
      url: '/reportInfo.do',
      method: 'post',
      data
    })
  },
  report(data) {
    return request({
      url: '/reportInfo.do',
      method: 'post',
      data
    })
  },
  queryData(data) {
    return request({
      url: '/perReportInfo.do',
      method: 'post',
      data
    })
  }
}
