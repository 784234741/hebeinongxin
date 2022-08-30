import request from '@/utils/request'

export const SysTiming = {
  scheduleData(data) {
    return request({
      url: '/scheduleManage.do',
      method: 'post',
      data
    })
  }
}
