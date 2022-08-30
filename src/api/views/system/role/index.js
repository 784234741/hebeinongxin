import request from '@/utils/request'

// 登录页相关接口
export const SysRole = {
  query(data) { // 左侧：查询列表
    return request({
      url: '/roleController.do',
      method: 'post',
      data
    })
  },
  tree(data) { // 右侧：查询树
    return request({
      url: '/roleRights.do',
      method: 'post',
      data
    })
  },
  roleInfo(data) { // 查询角色信息
    return request({
      url: '/appearanceQueryController.do',
      method: 'post',
      data
    })
  },
  clickRow(data) { // 左侧：单击行更新右侧树
    return request({
      url: '/roleRights.do',
      method: 'post',
      data
    })
  },
  treeSave(data) { // 右侧：保存按钮
    return request({
      url: '/roleRights.do',
      method: 'post',
      data
    })
  },
  add(data) { // 左侧：新增
    return request({
      url: '/roleController.do',
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: '/roleController.do',
      method: 'post',
      data
    })
  },
  del(data) {
    return request({
      url: '/roleController.do',
      method: 'post',
      data
    })
  },
  treeModel(data) { // 左侧：单击行更新右侧树(监测系统)
    return request({
      url: '/SmUserModelController.do',
      method: 'post',
      data
    })
  },
  clickRowModel(data) { // 左侧：单击行更新右侧树(监测系统)
    return request({
      url: '/SmUserModelController.do',
      method: 'post',
      data
    })
  }
}
