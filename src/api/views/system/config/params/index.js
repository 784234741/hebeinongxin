import request from '@/utils/request'

export const SysParams = {
  systemParam(data) {
    return request({
      url: '/systemParam.do',
      method: 'post',
      data
    })
  },
  getSysParamsExdata(data) {
    return request({
      url: '/externalDataController.do',
      method: 'post',
      data
    })
  }
}
