// 公共
module.exports = [
  // 机构
  {
    url: '/organDataController.do',
    type: 'post',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '执行成功',
        'retMap': {
          'organList': [
            { 'id': '01121', 'pId': '0', 'name': '01121-省联社财务部', 'isParent': 'true', 'open': 'true', 'icon': '', 'reserve': '1' },
            { 'id': '000001', 'pId': '0', 'name': '01000-河北省农联社', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '01100', 'pId': '01121', 'name': '01100-省联社', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '01101', 'pId': '01121', 'name': '01101-省联社清算中心', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '01102', 'pId': '01121', 'name': '01102-省联社运行中心', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '01103', 'pId': '01121', 'name': '01103-省联社参数中心', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '01105', 'pId': '01121', 'name': '01105-省联社卡中心', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '01122', 'pId': '01121', 'name': '01122-省联社资金营运中心', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '01123', 'pId': '01121', 'name': '01123-省联社调账中心', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '02001', 'pId': '01121', 'name': '02001-河北省农村信用合作社联合社邯郸审计中心', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '07001', 'pId': '01121', 'name': '07001-河北省农村信用社联合社邢台审计中心', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '12001', 'pId': '01121', 'name': '12001-石家庄办事处本部', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '17001', 'pId': '01121', 'name': '17001-衡水市农村信用合作社联合社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '22099', 'pId': '01121', 'name': '22099-保定市办事处', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '27003', 'pId': '01121', 'name': '27003-沧州市农村信用合作社联合社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '32001', 'pId': '01121', 'name': '32001-河北省农村信用联合社廊坊办事处', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '37001', 'pId': '01121', 'name': '37001-河北省农村信用社联合社唐山审计中心', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '37101', 'pId': '01121', 'name': '37101-河北唐山农村商业银行股份有限公司', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '42001', 'pId': '01121', 'name': '42001-河北省农村信用社联合社秦皇岛审计中心', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '47001', 'pId': '01121', 'name': '47001-河北省农村信用社联合社张家口审计中心', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '47099', 'pId': '01121', 'name': '47099-张家口农村商业银行股份有限公司', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '56501', 'pId': '01121', 'name': '56501-河北省农村信用社联合社承德审计中心', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '88136', 'pId': '01121', 'name': '88136-唐山市郊区农村信用合作联社大里路信用社', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '96369', 'pId': '01121', 'name': '96369-省联社客服中心', 'isParent': 'false', 'open': 'false', 'icon': '', 'reserve': '2' },
            { 'id': '02071', 'pId': '02001', 'name': '02071-河北邯郸农村商业银行股份有限公司', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '02361', 'pId': '02001', 'name': '02361-邯郸市峰峰矿区农村信用合作联社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '02651', 'pId': '02001', 'name': '02651-邯郸县农村信用合作联社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '02941', 'pId': '02001', 'name': '02941-永年县农村信用联社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '03231', 'pId': '02001', 'name': '03231-磁县农村信用合作联社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '03521', 'pId': '02001', 'name': '03521-广平县农村信用合作联社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '03900', 'pId': '02001', 'name': '03900-河北涉县农村商业银行股份有限公司', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '04101', 'pId': '02001', 'name': '04101-成安县农村信用合作联社', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '04391', 'pId': '02001', 'name': '04391-临漳县农村信用合作联社(本部)', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' },
            { 'id': '04681', 'pId': '02001', 'name': '04681-河北大名农村商业银行股份有限公司', 'isParent': 'true', 'open': 'false', 'icon': '', 'reserve': '3' }
          ]
        }
      }
    }
  },
  // 用户头像
  {
    url: '/userController.do',
    type: 'post',
    response: config => {
      return {
        'retCode': '0',
        'retMsg': null,
        'retMap': {
          'image': 'D:/TempFiles/UserImageFiles/202111/2cd3ba22-fe9a-4058-b2fd-1106b2440aca_wxtp_20210926091136.jpg##微信图片_20210926091136.jpg'
        }
      }
    }
  },
  // 按钮权限
  {
    url: '/MenuIdCheck.do',
    type: 'post',
    response: config => {
      return {
        'retCode': null, 'retMsg': null, 'retMap': null
      }
    }
  },
  // 同步数据字典
  {
    url: '/fieldController.do',
    type: 'post',
    response: config => {
      return {
        'retCode': 200,
        'retMsg': '执行成功',
        'retMap': {
          'fieldTime': '20211221091721',
          US2000: 'US2001#-#1#-#密码登陆&US2002#-#2#-#指纹登陆',
          US3000: 'US3001#-#0#-#未登录&US3002#-#1#-#已登录',
          US1000: 'US1001#-#1#-#正常&US1002#-#2#-#锁定&US1003#-#3#-#注销&US1004#-#4#-#休假',
          RL1000: 'RL1001#-#1#-#1-管理类&RL1002#-#2#-#2-业务类&RL1003#-#3#-#3-模型类',
          US5000: 'US5001#-#1#-#1级&US5002#-#2#-#2级&US5003#-#3#-#3级&US5004#-#4#-#4级&US5005#-#5#-#5级&US5006#-#6#-#6级&US5007#-#7#-#7级&US5008#-#8#-#8级',
          CM1000: 'CM1001#-#0#-#0-未启用&CM1002#-#1#-#1-启用',
          CM1030: 'AU1101#-#OP001#-#新增&AU1102#-#OP002#-#删除&AU1103#-#OP003#-#修改&AU1104#-#OP004#-#查询&AU1105#-#OP998#-#导入',
          US4000: 'US4001#-#0#-#否&US4002#-#1#-#是',
          OG3000: 'OG3001#-#1#-#1-总行&OG3002#-#2#-#2-一级分行&OG3003#-#3#-#3-二级分行&OG3004#-#4#-#4-支行&OG3005#-#5#-#5-三级分行',
          CM3000: 'CM3001#-#1#-#普通菜单&CM3002#-#2#-#报表菜单&CM3003#-#3#-#档案菜单&CM3004#-#4#-#数据分析菜单&CM3005#-#5#-#排班菜单'
        }}
    }
  }
]
