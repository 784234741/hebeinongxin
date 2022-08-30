import request from '@/utils/request'

// 登录页相关接口
export const SysUser = {
  // 角色查询
  roleNoTree(data) {
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  query(data) { // 用户查询
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  add(data) { // 新增
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  update(data) { // 修改
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  del(data) { // 删除
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  forcedLogout(data) { // 强制退出
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  batchSys(data) { // 批量配置
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  resetPsd(data) { // 重置密码
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  },
  enableDisable(data) { // 启用/停用
    return request({
      url: '/userConfigController.do',
      method: 'post',
      data
    })
  }
}
