// 菜单配置
module.exports = [
  { // 初始菜单
    url: '/customMenuEditController.do',
    type: 'post',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '查询成功',
        'retMap': {
          returnList: [
            {
              'menuId': '1', // 菜单id
              'parentId': '0', // 菜单父节点id
              'redirect': null, // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
              'path': '/system', // 路由path配置
              'component': '/Layout', // 路由组件配置
              'alwaysShow': true, // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
              'name': 'System', // 组件中name
              'menu_class': 'table', // 图标
              'menuName': '系统管理', // 标题
              'menuDesc': '', // 菜单描述
              'menu_type': '1', // 菜单分类
              'home_show': '0' // 显示方式
            },
            {
              'menuId': '100',
              'parentId': '1',
              'redirect': null, 'path': 'config', 'component': 'system/config',
              'name': 'Config',
              'alwaysShow': true,
              'menu_class': '', // 图标
              'menuName': '系统配置', // 标题
              'menuDesc': '', // 菜单描述
              'menu_type': '1', // 菜单分类
              'home_show': '0' // 显示方式
            },
            {
              'menuId': '110',
              'parentId': '100',
              path: 'menu',
              component: 'system/config/menu',
              name: 'Menu',
              'menu_class': '', // 图标
              'menuName': '菜单配置', // 标题
              'menuDesc': '', // 菜单描述
              'menu_type': '1', // 菜单分类
              'home_show': '0' // 显示方式
            }
            // { // 原节点格式
            //   'menuId': '#Z60106',
            //   'menuName': '报表设计器',
            //   'parentId': '#000000',
            //   'menuDesc': null, 'menuUrl': '/',
            //   'menuLevel': '1', 'isOpen': '1',
            //   'lastModiDate': '20200718070707',
            //   'editEnable': '1',
            //   'systemNo': 'AOS',
            //   'bankNo': 'SUNYARD',
            //   'projectNo': 'AOS',
            //   'menuOrder': '00',
            //   'menuBelong': '0',
            //   'menuPage': null, 'isParent': '1', 'addBtn': null, 'addEle': null, 'delBtn': null, 'delEle': null,
            //   'isLock': null, 'menu_type': '1', 'menu_attr': '1', 'home_show': '0', 'auth_way': null, 'auth_role': null,
            //   'auth_flow': null, 'query_conditions': null, 'menu_def': null, 'menu_class': 'Sun_line_Report_designer'
            // }
          ]
        }
      }
    }
  },
  { // 节点新增、修改保存
    url: '/customMenuEditControllerSave.do',
    type: 'post',
    response: config => {
      return { 'retCode': 200, 'retMsg': '执行成功',
        'retMap': {
          'newIsParent': '0', 'newMenuId': '#E00046', 'newParentId': '#000000',
          'newMenuLevel': '1', 'addResult': 'success', 'newEditEnable': '1' }
      }
    }
  },
  { // 节点删除
    url: '/customMenuEditControllerDel.do',
    type: 'post',
    response: config => {
      return { 'retCode': 200, 'retMsg': '执行成功', 'retMap': { 'deleteResult': 'success' }}
    }
  },
  { // 按钮查看
    url: '/customMenuEditControllerBtn.do',
    type: 'post',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '执行成功',
        'retMap': {
          'butlist': [
            { 'buttonId': 'btnQuery', 'buttonName': '查询', 'menuId': '#C10208', 'isOpen': null, 'isLock': null, 'lastModiDate': '20211221135803', 'systemNo': null, 'bankNo': null, 'projectNo': null },
            { 'buttonId': 'btnAdd', 'buttonName': '新增', 'menuId': '#C10208', 'isOpen': null, 'isLock': null, 'lastModiDate': '20211221135803', 'systemNo': null, 'bankNo': null, 'projectNo': null }
          ] }
      }
    } }
]
