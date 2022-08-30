// 用户管理
module.exports = [
  // 角色
  {
    url: '/userConfigController.do',
    type: 'post',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': null,
        'retMap': {
          'rolelist': [
            { 'role_name': '测试', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '2', 'role_des': '', 'is_lock': '', 'role_level': '109', 'role_no': '99993', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20210611174844' },
            { 'role_name': '网点岗位', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '322', 'role_no': '1234', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211009105222' },
            { 'role_name': '测试所有权限', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '122', 'role_no': '20', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20210611152845' },
            { 'role_name': '公告初审员', 'project_no': 'AOS', 'role_type': '2', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '320', 'role_no': '2100', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20200701140149' }, { 'role_name': '柜面测试开销变', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '123', 'role_no': '2345', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211011134310' },
            { 'role_name': '业务开销变', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '418', 'role_no': '2346', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211011135005' }, { 'role_name': '网点', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '432', 'role_no': '2347', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211011151525' }, { 'role_name': '县级', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '336', 'role_no': '2348', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211011151612' },
            { 'role_name': '市级', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '269', 'role_no': '2349', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211011151636' }, { 'role_name': '省级', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '168', 'role_no': '2350', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211011151707' }, { 'role_name': '测试机构', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '', 'is_lock': '', 'role_level': '202', 'role_no': '8569', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20210825101748' },
            { 'role_name': '测试三级分行', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '1', 'role_des': '测试三级分行', 'is_lock': '', 'role_level': '533', 'role_no': '9876', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20211011112919' },
            { 'role_name': '业务参数配置岗', 'project_no': 'AOS', 'role_type': '1', 'is_open': '1', 'role_mode': '2', 'role_des': '业务参数配置岗', 'is_lock': 'sunds', 'role_level': '101', 'role_no': '9999', 'bank_no': 'SUNYARD', 'system_no': 'AOS', 'last_modi_date': '20170728174712' }]
        }}
    }
  },
  // 查询
  {
    url: '/system/query',
    type: 'get',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '查询成功',
        'retMap': {
          'totalNum': 36, 'role_level': '0', 'currentPage': 1, 'pageNum': 15,
          'returnList': [
            { 'last_login_time': '20211221092300', 'user_name': 'ceshi3', 'bank_no': 'SUNYARD', 'error_count': '0', 'last_logout_time': '20211221091814', 'tellerlvl': '1', 'user_no': 'ceshi3', 'password': '6St81ztijWqYnAlNmUafZg==', 'emp_no': '', 'undersigned': '', 'organ_no': '01121', 'system_no': 'AOS', 'user_status': '1', 'image': 'D:/TempFiles/UserImageFiles/202111/0541f328-a3fe-4836-81eb-95584c7e671c_Penguins.jpg##Penguins.jpg', 'login_mobile_server': '', 'terminal_ip': '', 'login_mode': '1', 'last_modi_date': '20211116091333', 'terminal_mac': '', 'project_no': 'AOS', 'phone': '15555555555', 'login_pc_server': '10.6.11.122:7001/SunAOS', 'login_state': '1', 'user_enable': '', 'single_login': '1', 'custom_attr': '{"theme":"mainBlue"}', 'role_no': '99993', 'row_id': 1, 'rn': 1 }, { 'last_login_time': '20211221102416', 'user_name': 'ceshi1', 'bank_no': 'SUNYARD', 'error_count': '0', 'last_logout_time': '20211221110751', 'tellerlvl': '1', 'user_no': 'ceshi1', 'password': 'oVew97LlBkOYtuvyAnZgnQ==', 'emp_no': '', 'undersigned': '', 'organ_no': '01121', 'system_no': 'AOS', 'user_status': '2', 'image': '', 'login_mobile_server': '', 'terminal_ip': '', 'login_mode': '1', 'last_modi_date': '20211105134921', 'terminal_mac': '', 'project_no': 'AOS', 'phone': '13222222222', 'login_pc_server': '', 'login_state': '0', 'user_enable': '', 'single_login': '1', 'custom_attr': '', 'role_no': '99993', 'row_id': 2, 'rn': 2 },
            { 'last_login_time': '20220104135155', 'user_name': '系统超级管理员', 'bank_no': 'SUNYARD', 'error_count': '0', 'last_logout_time': '20211231160500', 'tellerlvl': '1', 'user_no': 'admin', 'password': 'oZVYDNXRjJd+uoDv/pGjJQ==', 'emp_no': '', 'undersigned': '', 'organ_no': '01121', 'system_no': 'AOS', 'user_status': '1', 'image': 'D:/TempFiles/UserImageFiles/202111/2cd3ba22-fe9a-4058-b2fd-1106b2440aca_wxtp_20210926091136.jpg##微信图片_20210926091136.jpg', 'login_mobile_server': '', 'terminal_ip': '', 'login_mode': '1', 'last_modi_date': '20211019162703', 'terminal_mac': '', 'project_no': 'AOS', 'phone': '', 'login_pc_server': '172.1.1.21:7001/SunAOS', 'login_state': '1', 'user_enable': '1', 'single_login': '1', 'custom_attr': '{"theme":"mainBlue"}', 'role_no': '', 'row_id': 3, 'rn': 3 }, { 'last_login_time': '20211019091846', 'user_name': '01121总行', 'bank_no': 'SUNYARD', 'error_count': '0', 'last_logout_time': '20211019101239', 'tellerlvl': '1', 'user_no': '01121zh', 'password': '6St81ztijWqYnAlNmUafZg==', 'emp_no': '', 'undersigned': '', 'organ_no': '01121', 'system_no': 'AOS', 'user_status': '3', 'image': '', 'login_mobile_server': '', 'terminal_ip': '', 'login_mode': '1', 'last_modi_date': '20211014093903', 'terminal_mac': '', 'project_no': 'AOS', 'phone': '', 'login_pc_server': '', 'login_state': '0', 'user_enable': '', 'single_login': '1', 'custom_attr': '', 'role_no': '2350', 'row_id': 4, 'rn': 4 }
          ]
        }
      }
    }
  },
  // 新增
  {
    url: '/system/add',
    type: 'get',
    response: config => {
      return {
        'retCode': 200,
        'retMap': {},
        'retMsg': '新增成功'
      }
    }
  },

  // 编辑
  {
    url: '/system/update',
    type: 'get',
    response: _ => {
      return {
        'retCode': 200,
        'retMap': {},
        'retMsg': '修改成功'
      }
    }
  },

  // 删除
  {
    url: '/system/del',
    type: 'get',
    response: _ => {
      return {
        'retCode': 200,
        'retMap': {},
        'retMsg': '删除成功'
      }
    }
  },

  // 强制登出
  {
    url: '/userConfigController2.do',
    type: 'get',
    response: _ => {
      return {
        retCode: 200,
        retMap: null,
        retMsg: '强制登出成功'
      }
    }
  },

  // 批量配置
  {
    url: '/userConfigController3.do',
    type: 'get',
    response: _ => {
      return {
        retCode: 200,
        retMap: null,
        retMsg: '批量更新成功'
      }
    }
  },

  // 重置密码
  {
    url: '/userConfigController4.do',
    type: 'get',
    response: _ => {
      return {
        retCode: 200,
        retMap: null,
        retMsg: '重置密码成功'
      }
    }
  },

  // 启用/停用
  {
    url: '/userConfigController5.do',
    type: 'get',
    response: _ => {
      return {
        retCode: 200,
        retMap: null,
        retMsg: '执行成功'
      }
    }
  }
]
