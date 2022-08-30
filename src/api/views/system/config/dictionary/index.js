import request from '@/utils/request'
// 菜单配置
export const SysDictionary = {
  getTreeData(data) { // 初始菜单配置
    return request({
      url: '/fileParamcontroller.do',
      method: 'post',
      data
    })
  }
}
