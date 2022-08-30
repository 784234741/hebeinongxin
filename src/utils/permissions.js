/* 权限配置 */
import store from '@/store'
import { commonBlank } from '@/utils/common'
import { dictionaryGet } from '@/utils/dictionary'
// import { Common } from '@/api'
// const { btnLimit } = Common

/**
 * 按钮权限配置: 获取当前点击菜单的按钮权限: 返回按钮是否可用（true|false）的数组
 * @param {String} btnRoute 按钮标识， 路由返回当前用户已有权限
 * @param {Object} btnPage 按钮对象，当前页所有按钮
 */
export const permissionsBtn = (btnRoute, btnPage) => {
  const btnIdArr = btnRoute
  const btnAll = ''
  if (commonBlank(btnIdArr)) {
    // const msg = {
    //   'userNo': store.getters.userNo,
    //   'oper_type': 'buttonIdCheck'
    // }
    // btnLimit(msg).then(response => {
    //   const { list } = response
    //   btnAll = list
    //   // commonMsgSuccess(response.retMsg, this)
    // }).catch(() => {
    // })
  }
  const btnEnabledArr = btnRoute.split(',') // 当前页面按钮权限
  const btnArr = {}
  for (const item in btnPage) {
    if (btnEnabledArr.indexOf(item) !== -1 ||
        dictionaryGet('SYS_ADMIN').indexOf(store.getters.userNo) !== -1 || // 系统超级管理员默认具有所有权限
        btnAll.indexOf(item) !== -1 // 普通用户查询出所有的权限按钮并获取权限
    ) {
      btnArr[item] = true
    } else {
      btnArr[item] = false
    }
  }
  return btnArr
}

/**
 * 预警模块权限配置
 *  判断系统模块列表函数
 *  @param {String} moduleId : 判断当前系统是否包含的 模块编号
 *  flag :返回值 false-不包含 true-包含
*/
export const commonCompareIncludeModule = (moduleId) => {
  // 返回值
  let flag = false
  // 获取系统模块列表
  const includeModule = ',' + store.state.user.loginInfo.includeModule + ','
  if (includeModule.indexOf(',' + moduleId + ',') !== -1) {
    flag = true
  }
  return flag
}
