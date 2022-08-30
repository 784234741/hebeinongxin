import request from '@/utils/request'

export const AccHang = {
  dormancyManage(data) {
    return request({
      url: '/dormancyManage.do',
      method: 'post',
      data
    })
  }
}
