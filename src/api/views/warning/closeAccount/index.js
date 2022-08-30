import request from '@/utils/request'

export const WarningFrequentOpenClose = {
  frequentOpenClose(data) {
    return request({
      url: '/frequentOpenClose.do',
      method: 'post',
      data
    })
  }
}
