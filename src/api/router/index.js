import request from '@/utils/request'

// 首页相关接口
export const RouterRequest = {
  menu(data) { // 左侧菜单
    return request({
      url: '/menuTreeController.do',
      method: 'post',
      data
    })
  }
}
