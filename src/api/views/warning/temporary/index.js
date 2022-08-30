import request from '@/utils/request'

export const WarningTemporaryWarn = {
  temporaryWarn(data) {
    return request({
      url: '/temporaryWarn.do',
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
