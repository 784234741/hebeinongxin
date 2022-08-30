// 角色管理
module.exports = [
  // 查询
  {
    url: '/system/role/query',
    type: 'get',
    response: (config) => {
      return {
        'retCode': 200,
        'retMsg': '查询成功',
        retMap: {
          'currentPage': 1, // 当前页码
          'pageNum': 15, // 页记录数
          'currentNum': 4, // 当前返回条数
          'totalNum': 4, // 总记录数
          'returnList': [
            // 返回结果
            {
              'role_no': '1',
              'role_name': '测试',
              'role_organ_level': '1',
              'role_level': '09',
              'role_des': '',
              'role_mode': '2',
              'is_open': '1',
              'last_modi_date': '20211221092300',
              rn: 1
            },
            {
              'role_no': '1234',
              'role_name': '网点岗位',
              'role_organ_level': '3',
              'role_level': '22',
              'role_des': '',
              'role_mode': '1',
              'is_open': '1',
              'last_modi_date': '20211221092300',
              rn: 2
            },
            {
              'role_no': '20',
              'role_name': '测试所有权限',
              'role_organ_level': '1',
              'role_level': '22',
              'role_des': '',
              'role_mode': '1',
              'is_open': '1',
              'last_modi_date': '20211221092300',
              'rn': 3
            },
            {
              'role_no': '2100',
              'role_name': '公告初审员',
              'role_organ_level': '3',
              'role_level': '20',
              'role_des': '',
              'role_mode': '1',
              'is_open': '1',
              'last_modi_date': '20211221092300',
              rn: 4
            },
            {
              'role_no': '2100',
              'role_name': '公告初审员',
              'role_organ_level': '3',
              'role_level': '20',
              'role_des': '',
              'role_mode': '1',
              'is_open': '1',
              'last_modi_date': '20211221092300',
              rn: 5
            },
            {
              'role_no': '2100',
              'role_name': '公告初审员',
              'role_organ_level': '3',
              'role_level': '20',
              'role_des': '',
              'role_mode': '1',
              'is_open': '1',
              'last_modi_date': '20211221092300',
              rn: 6
            }
          ]
        }
      }
    }
  },
  // 新增
  {
    url: '/system/role/add',
    type: 'get',
    response: (config) => {
      return {
        retCode: 200,
        retMap: {},
        retMsg: '新增成功'
      }
    }
  },

  // 编辑
  {
    url: '/system/role/update',
    type: 'get',
    response: (_) => {
      return {
        retCode: 200,
        retMap: {},
        retMsg: '修改成功'
      }
    }
  },

  // 删除
  {
    url: '/system/role/del',
    type: 'get',
    response: (_) => {
      return {
        retCode: 200,
        retMap: {},
        retMsg: '删除成功'
      }
    }
  },

  // 测试
  {
    url: '/system/role/deml',
    type: 'get',
    response: (_) => {
      return {
        retCode: 200,
        retMsg: '查询成功',
        retMap: {
          list: [
            {
              id: 1,
              role_no: 1
            }
          ]
        }
      }
    }
  },

  // 查询权限
  {
    url: '/system/choose',
    type: 'get',
    response: (_) => {
      return {
        retCode: 200,
        retMsg: '查询成功',
        retMap: {
          list: [
            {
              menuId: '#000000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#300000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#340000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#342000',
              buttonId:
                'reportUser_addBtn,reportUser_deleteBtn,reportUser_downloadBtn,reportUser_forceUpdateBtn,reportUser_importBtn,reportUser_modifyBtn,reportUser_pswBtn,reportUser_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#343000',
              buttonId:
                'handReport_btn,reportInfo_exportBtn,reportInfo_printAcc_btn,reportInfo_printPsw_btn,reportInfo_queryBtn,reportInfo_reportAddBtn,reportInfo_reportStartBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#344000',
              buttonId: 'handReport_modifyBtn,handReport_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#350000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#351000',
              buttonId:
                'noAnnualList_addBtn,noAnnualList_deleteBtn,noAnnualList_downloadBtn,noAnnualList_exportBtn,noAnnualList_importBtn,noAnnualList_modifyBtn,noAnnualList_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#352000',
              buttonId:
                'annualDate_addBtn,annualDate_deleteBtn,annualDate_modifyBtn,annualDate_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#353000',
              buttonId:
                'annualInfo_applySureBtn,annualInfo_exportBtn,annualInfo_handAnnualBtn,annualInfo_printBtn,annualInfo_queryBtn,annualInfo_reportAgain,annualInfo_startAnnualBtn,annualInfo_sureAgainBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#354000',
              buttonId:
                'handAnnual_exportBtn,handAnnual_handAnnualBtn,handAnnual_printBtn,handAnnual_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#355000',
              buttonId:
                'annualRule_addBtn,annualRule_deleteBtn,annualRule_modifyBtn,annualRule_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#357000',
              buttonId: 'annualHistory_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#360000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#361000',
              buttonId: 'papersWarn_exportBtn,papersWarn_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#362000',
              buttonId: 'temporaryWarn_exportBtn,temporaryWarn_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#364000',
              buttonId: 'annualWarn_exportBtn,annualWarn_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#370000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#371000',
              buttonId: 'accInfo_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#373000',
              buttonId:
                'cusInfo_printAcc_btn,cusInfo_printPsw_btn,cusInfo_queryAgain_btn,cusInfo_select_btn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#390000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#3A0000',
              buttonId: null,
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#3A1000',
              buttonId: 'multiCheck_connetBtn,multiCheck_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#3b0000',
              buttonId: 'dormancyManage_queryBtn',
              elementList: 'dormancyManage_queryBtn:',
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00009',
              buttonId:
                'seasonAnnualInfo_exportBtn,seasonAnnualInfo_handAnnualBtn,seasonAnnualInfo_printBtn,seasonAnnualInfo_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00012',
              buttonId: 'accTotalOpen_exportBtn,accTotalOpen_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00023',
              buttonId:
                'accountRisk_AddBtn,accountRisk_ModifyBtn,accountRisk_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00024',
              buttonId: 'legalMulti_exportBtn,legalMulti_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00025',
              buttonId: 'addrMulti_changeBtn,addrMulti_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00026',
              buttonId: 'accManageCheck_queryBtn',
              elementList: 'accManageCheck_queryBtn:',
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00029',
              buttonId:
                'reconciliationInfo_printBtn,reconciliationInfo_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00038',
              buttonId:
                'unitAccStatistics_exportBtn,unitAccStatistics_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00039',
              buttonId: 'accOpenMonitor_exportBtn,accOpenMonitor_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00040',
              buttonId: 'reportSupple_exportBtn,reportSupple_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            },
            {
              menuId: '#E00041',
              buttonId:
                'frequentOpenClose_exportBtn,frequentOpenClose_queryBtn',
              elementList: null,
              roleNo: null,
              isOpen: null,
              isLock: null,
              lastModiDate: null,
              bankNo: null,
              systemNo: null,
              projectNo: null,
              operNodes: null
            }
          ]
        }
      }
    }
  }
]
