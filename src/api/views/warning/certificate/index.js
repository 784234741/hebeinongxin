import request from '@/utils/request'

export const WarningPapersWarn = {
  papersWarn(data) {
    return request({
      url: '/papersWarn.do',
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
