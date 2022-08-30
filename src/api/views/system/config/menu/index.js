import request from '@/utils/request'
// 菜单配置
export const SysMenu = {
  getTreeData(data) { // 初始菜单配置
    return request({
      url: '/customMenuEditController.do',
      method: 'post',
      data
    })
  },
  saveTreeData(data) { // 节点保存
    return request({
      url: '/customMenuEditController.do',
      method: 'post',
      data
    })
  },
  delTreeData(data) { // 节点删除
    return request({
      url: '/customMenuEditController.do',
      method: 'post',
      data
    })
  },
  btnQuery(data) { // 按钮获取
    return request({
      url: '/customMenuEditController.do',
      method: 'post',
      data
    })
  }
}
