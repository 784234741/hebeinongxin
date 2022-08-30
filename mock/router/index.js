// 路由
module.exports = [
  {
    url: '/menuTreeController.do',
    type: 'post',
    response: (config) => {
      return {
        retCode: '200',
        retMsg: '执行成功',
        retMap: {
          tokenMap: { refresh: 'false' },
          menuFlag: true,
          menuEleList: [{}],
          returnList: [
            {
              redirect: '',
              path: '/system',
              component: '/Layout',
              alwaysShow: true,
              name: 'System',
              children: [
                {
                  redirect: null,
                  path: 'config',
                  component: 'system/config',
                  meta: { icon: 'bug', title: '系统配置' },
                  button_id: '',
                  name: 'Config',
                  alwaysShow: true,
                  children: [
                    {
                      path: 'menu',
                      component: 'system/config/menu',
                      name: 'Menu',
                      meta: { title: '菜单配置' }
                    },
                    {
                      path: 'params',
                      component: 'system/config/params',
                      name: 'Params',
                      meta: { title: '参数配置' }
                    },
                    {
                      path: 'dictionary',
                      component: 'system/config/dictionary',
                      name: 'Dictionary',
                      meta: { title: '数据字典' }
                    },
                    {
                      path: 'application',
                      component: 'system/config/application',
                      name: 'Application',
                      meta: { title: '应用服务配置' }
                    },
                    {
                      path: 'timing',
                      component: 'system/config/timing',
                      name: 'Timing',
                      meta: { title: '定时服务配置' }
                    }
                  ]
                },
                {
                  redirect: null,
                  path: 'organ',
                  component: 'system/organ',
                  meta: { icon: '', title: '机构管理' },
                  button_id: '',
                  name: 'Organ',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'role',
                  component: 'system/role',
                  meta: { icon: '', title: '角色管理' },
                  button_id: '',
                  name: 'Role',
                  alwaysShow: false
                }
              ],
              meta: { icon: 'table', title: '系统管理' }
            },
            {
              redirect: '',
              path: '/statistical',
              component: '/Layout',
              alwaysShow: true,
              name: 'Statistical',
              children: [
                {
                  redirect: null,
                  path: 'personal',
                  component: 'statistical/personal',
                  meta: { icon: '', title: '个人账号统计查询' },
                  button_id: '',
                  name: 'Personal',
                  alwaysShow: true,
                  children: [
                    {
                      path: 'query',
                      component: 'statistical/personal/query',
                      name: 'Query',
                      meta: { title: '个人结算账户开户' }
                    }
                  ]
                }
              ],
              meta: { icon: '', title: '统计查询' }
            },
            {
              redirect: '',
              path: '/reported',
              component: '/Layout',
              alwaysShow: true,
              name: 'Reported',
              children: [
                {
                  redirect: null,
                  path: 'system/user',
                  component: 'system/user',
                  meta: { icon: '', title: '用户管理' },
                  button_id: '',
                  name: 'User',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'system',
                  component: 'reported/system',
                  meta: { icon: '', title: '报备系统配置' },
                  button_id: '',
                  name: 'ReportedSystem',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'user',
                  component: 'reported/user',
                  meta: { icon: '', title: '报备用户配置' },
                  button_id: '',
                  name: 'ReportedUser',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'info',
                  component: 'reported/info',
                  meta: { icon: '', title: '报备信息查询' },
                  button_id: '',
                  name: 'Info',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'offline',
                  component: 'reported/offline',
                  meta: { icon: '', title: '线下报备' },
                  button_id: '',
                  name: 'Offline',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'personal',
                  component: 'reported/personal',
                  meta: { icon: '', title: '个人批量报备' },
                  button_id: '',
                  name: 'ReportedPersonal',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'interface',
                  component: 'reported/interface',
                  meta: { icon: '', title: '报备接口查询' },
                  button_id: '',
                  name: 'Interface',
                  alwaysShow: false
                },
                {
                  redirect: null,
                  path: 'service',
                  component: 'reported/service',
                  meta: { icon: '', title: '报备服务配置' },
                  button_id: '',
                  name: 'Service',
                  alwaysShow: false
                }
              ],
              meta: { icon: '', title: '报备管理' }
            },
            {
              redirect: '',
              path: '/account',
              component: '/Layout',
              alwaysShow: true,
              name: 'Account',
              children: [
                {
                  redirect: null,
                  path: 'composite',
                  component: 'account/composite',
                  meta: { icon: '', title: '综合管理' },
                  name: 'Composite',
                  alwaysShow: true,
                  children: [
                    {
                      path: 'query',
                      component: 'account/composite/query',
                      name: 'Query',
                      meta: { title: '账户信息查' }
                    },
                    {
                      path: 'bank',
                      component: 'account/composite/bank',
                      name: 'Bank',
                      meta: { title: '行内客户信息查询' }
                    },
                    {
                      path: 'statistics',
                      component: 'account/composite/statistics',
                      name: 'Statistics',
                      meta: { title: '对账情况统计表' }
                    }
                  ]
                },
                {
                  redirect: null,
                  path: 'hang',
                  component: 'account/hang',
                  meta: { icon: '', title: '久悬管理' },
                  name: 'Than',
                  alwaysShow: false,
                  children: [
                    {
                      path: 'hanging',
                      component: 'account/hang/hanging',
                      name: 'Hanging',
                      meta: { title: '久悬管理' }
                    }
                  ]
                }
              ],
              meta: { icon: '', title: '账户管理' }
            },
            {
              redirect: '',
              path: '/assessment',
              component: '/Layout',
              alwaysShow: true,
              name: 'Assessment',
              children: [
                {
                  redirect: null,
                  path: 'query',
                  component: 'assessment/query',
                  meta: { icon: '', title: '账户服务和管理考核表' },
                  name: 'Query',
                  alwaysShow: false
                }
              ],
              meta: { icon: '', title: '账户考核' }
            }
          ],
          menu_type2: 'static/html/system/monitor/MonitorModule.html?reportlet='
        }
      }
      // return {
      //   'retMsg': '执行成功',
      //   'retCode': 200,
      //   'retMap': {
      //     'returnList': [
      //       {
      //         'path': '/system',
      //         'component': '/Layout',
      //         'name': 'System',
      //         'meta': {
      //           'title': '系统管理',
      //           'icon': 'table'
      //         },
      //         'children': [
      //           {
      //             'path': 'user',
      //             'component': 'system/user',
      //             'name': 'User',
      //             'meta': {
      //               'title': '用户管理'
      //             }
      //           },
      //           {
      //             'path': 'role',
      //             'component': 'system/role',
      //             'name': 'Role',
      //             'meta': {
      //               'title': '角色管理'
      //             }
      //           },
      //           {
      //             'path': 'organ',
      //             'component': 'system/organ',
      //             'name': 'Organ',
      //             'meta': {
      //               'title': '机构管理'
      //             }
      //           },
      //           {
      //             'path': 'config',
      //             'component': 'system/config',
      //             'name': 'Config',
      //             'redirect': 'system/config/params',
      //             'meta': {
      //               'title': '系统配置'
      //             },
      //             children: [
      //               {
      //                 path: 'menu',
      //                 component: 'system/config/menu',
      //                 name: 'Menu',
      //                 meta: { title: '菜单配置' }
      //               },
      //               {
      //                 path: 'params',
      //                 component: 'system/config/params',
      //                 name: 'Params',
      //                 meta: { title: '参数配置' }
      //               }
      //             ]
      //           },
      //           {
      //             'path': 'icon',
      //             'component': 'components-demo/icons',
      //             'name': 'Icon',
      //             'redirect': 'components-demo/icons',
      //             'alwaysShow': true,
      //             'meta': {
      //               'title': '图标'
      //             },
      //             children: [
      //               {
      //                 path: 'icons',
      //                 component: 'components-demo/icons',
      //                 name: 'Icons',
      //                 meta: { title: 'Icons' }
      //               }
      //             ]
      //           }
      //         ]
      //       }
      //     ],
      //     menuFlag: true,
      //     menu_type2: 'static/html/system/monitor/MonitorModule.html?reportlet=',
      //     menu_type3: 'http://172.1.1.48:6888/sunams_iframe/extend.html?userNo=,password=,menuId=',
      //     menu_type4: 'http://115.236.66.162:9447/sundap/extend.html?userNo=admin,password=123123,menuId=',
      //     menu_type5: 'http://172.1.1.221:8099/SunISM/extend.html?userNo=admin,password=admin,menuId='
      //   }
      // }
    }
  }
]
