import request from '@/utils/request'

export const SysDialogController = {
  sysDialogController(data) {
    return request({
      url: '/sysDialogController.do',
      method: 'post',
      data
    })
  },
  acHomePageInit(data) {
    return request({
      url: '/acHomePageInit.do',
      method: 'post',
      data
    })
  }
}
