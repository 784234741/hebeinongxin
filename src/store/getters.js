
const getters = {
  sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userNo: state => state.user.userNo, // 用户名
  userName: state => state.user.userName, // 用户名称
  organNo: state => state.user.organNo, // 机构号
  roleNo: state => state.user.roleNo, // 角色
  organLevel: state => state.user.organLevel, // 机构级别

  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  theme: state => state.settings.theme,

  organTreeObject: state => state.common.organTreeObject, // 机构数据为对象
  organTree: state => state.common.organTree, // 机构数据为树
  dictionaryLet: state => state.common.dictionaryLet, // 后台传入字典

  pageSize: state => state.common.pageSize, // 当前页默认条数
  externalData: state => state.common.externalData, // 外表字典

  homeMoudles: state => state.common.homeMoudles, // 默认显示模块
  homeMoudlesChecked: state => state.common.homeMoudlesChecked // 选择显示模块
}
export default getters
