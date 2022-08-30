import request from '@/utils/request'

// 登录页相关接口
export const Common = {
  // 机构
  organTree(data) {
    return request({
      url: '/organDataController.do',
      method: 'post',
      data
    })
  },
  // 机构
  organTreeSelf(data) {
    return request({
      url: '/arsOrganInfo.do',
      method: 'post',
      data
    })
  },

  // 用户头像
  userPhoto(data) {
    return request({
      url: '/userController.do',
      method: 'post',
      data
    })
  },
  // 按钮权限
  btnLimit(data) {
    return request({
      url: '/MenuIdCheck.do',
      method: 'post',
      data
    })
  },
  // 同步数据字典
  fieldController(data) {
    return request({
      url: '/fieldController.do',
      method: 'post',
      data
    })
  },

  // 获取外表数据
  fieldExternalDataController(data) {
    return request({
      url: '/externalDataController.do',
      method: 'post',
      data
    })
  },

  // 主页设置
  sysDialogController(data) {
    return request({
      url: '/sysDialogController.do',
      method: 'post',
      data
    })
  },

  // 获取用户信息
  userController(data) {
    return request({
      url: '/userController.do',
      method: 'post',
      data
    })
  },

  // 修改密码
  changePasswordController(data) {
    return request({
      url: '/changePasswordController.do',
      method: 'post',
      data
    })
  },
  // 免密登录
  checkUrl(data) {
    return request({
      url: '/checkUrl.do',
      method: 'post',
      data
    })
  }
}
