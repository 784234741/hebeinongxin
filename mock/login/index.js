// 登录
module.exports = [
  // user login
  {
    url: '/loginController.do',
    type: 'post',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '执行成功',
        'retMap': {
          'Authorization': 'token1',
          'customAttrMap': { 'theme': 'main' },
          'isOverFlag': '0',
          'loginUser': {
            'userNo': 'admin',
            'password': 'oZVYDNXRjJd+uoDv/pGjJQ==',
            'isCheck': null,
            'organNo': '000001',
            'userName': '系统超级管理员',
            'userEnable': '1',
            'loginMode': '1',
            'loginState': '1',
            'lastModiDate': '20211118165906',
            'undersigned': null, 'tellerlvl': '1', 'userStatus': '1', 'singleLogin': '0', 'lastLoginTime': '20211229095322', 'lastLogoutTime': '20211229095310', 'terminalIp': null, 'terminalMac': null, 'loginPCServer': null, 'loginMobileServer': '172.1.10.221:8080/SunAOS', 'bankNo': 'SUNYARD', 'systemNo': 'AOS', 'projectNo': 'AOS', 'loginTime': '20211229095322', 'loginType': '1',
            'loginTerminal': '1', 'roleNo': '', 'empNo': null, 'error_count': '0', 'phone': null, 'custom_attr': '{"theme":"main"}', 'isManageUser': null,
            'is_resize': '1'
          },
          'isFirstLogin': '0',
          'includeModule': '01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,18,19,20,21,27,28',
          'kkIP': '127.0.0.1',
          'maxUploadSize': '500M',
          'loginMsg': '登录成功',
          'loginFlag': 'loginSuccess',
          'loginOrgan': { 'organNo': '000001', 'organName': '总行运营管理部', 'shname': '集中作业处理中心', 'organLevel': '1', 'organType': '1', 'parentOrgan': '000001', 'lastModiDate': '20210913165803', 'bankNo': 'SUNYARD', 'systemNo': 'AOS', 'projectNo': 'AOS' },
          'iskk': '0',
          'kkport': '8012' }
      }
    }
  },
  { // 客户访问时间校验
    url: '/LoginTimeCheck.do',
    type: 'post',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '访问请求时间设置为空，不进行校验',
        'retMap': null
      }
    }
  },
  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '成功',
        'retMap': {
          'avatar': '',
          'introduction': '主管',
          'name': 'Admin',
          'roles': [
            'admin'
          ]
        }
      }
    }
  },

  // user logout
  {
    url: '/logout.do',
    type: 'post',
    response: _ => {
      return {
        'retCode': 200,
        'retMap': {},
        'retMsg': '成功'
      }
    }
  }
]
