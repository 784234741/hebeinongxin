import request from '@/utils/request'

export const SysApplication = {
  server(data) {
    return request({
      url: '/serverController.do',
      method: 'post',
      data
    })
  }
}
