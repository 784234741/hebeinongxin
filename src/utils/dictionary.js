// 字典:
import store from '@/store'

let flagChange = false // 是否更新

/**
 * 获取字典： 后台传入字典, 获取数组
 * @param {String} fieldId 字典key值
 * @param {Boolean} type dictionaryFieds('CM7000', true)/dictionaryFieds('SERVICE_MODULE')
 * */
export function dictionaryFieds(fieldId, type) {
  let fieldStr = null
  if (type) {
    fieldStr = store.state.common.dictionaryLet[fieldId]
  } else {
    fieldStr = store.state.common.dictionaryLet[dictionaryGet(fieldId)]
  }

  if (Object.keys(fieldStr).length === 0) {
    console.log('本地存储中没有字典号 ' + fieldId + ' 对应的数据')
    return []
  }
  let datas = []
  const fieldArr = fieldStr.split('&').sort()
  for (const key of fieldArr) {
    const arr = key.split('#-#')
    datas = [...datas, { id: arr[0], label: arr[2], value: arr[1] }]
  }
  return datas
}

/**
 * 获取字典: 常量
 * @param {String} key 字典key
 * */
export function dictionaryGet(key) {
  const datas = dictionary('get', key)
  return datas
}

/**
 * 设置字典: 常量
 * @param {Objext} obj 设置字典的对象*/
export function dictionarySet(obj) {
  dictionary('set', obj)
}

/**
 * 字典配置: 常量
 * @param {String} flag 字典配置 get、set
 * @param {Object/String} obj
 */
export function dictionary(flag, obj) {
  let dictionary = {
    // 默认初始密码
    DEFAULT_PSWD: '123456',
    // 登入方式
    USER_LOGIN_TYPE: 'US2000',
    // 登入状态
    USER_LOGIN_STATE: 'US3000',
    // 用户状态
    USER_STATE: 'US1000',
    // 角色类别
    ROLE_MODE: 'RL1000',
    // 用户级别
    USER_LEVEL: 'US5000',
    // 启用标志
    IS_OPEN: 'CM1000',
    // 机构级别
    ORGAN_LEVEL: 'OG3000',
    // 系统超级管理员
    SYS_ADMIN: ',admin,admin1,admin2,',

    // 操作标识：新增
    OPERATE_ADD: 'OP001',
    // 操作标识：删除
    OPERATE_DELETE: 'OP002',
    // 操作标识：修改
    OPERATE_MODIFY: 'OP003',
    // 操作标识：查询
    OPERATE_QUERY: 'OP004',
    // 操作标识：导入
    OPERATE_IMPORT: 'OP998',
    // 操作标识：其他
    OPERATE_OTHER: 'OP999',

    // 是否联动下级机构
    IS_CHANGE_CHILDREN: 'US4000',
    // 菜单分类
    MENU_TYPE: 'CM3000',

    // 用户系统类型
    REPORT_SYS_TYPE: 'AM4A00',
    // 报备柜员类型
    REPORT_USER_TYPE: 'AM4700',
    // 报备用户级别
    AM_REPORTUSER_LEVEL: 'AM4c00',
    // 报备用户密码查看授权角色
    REPORT_USER_ROLE: '1001',

    // 服务类型
    SERVER_TYPE: 'CM2000',
    // 识别方式
    IRP_TYPE: 'SM1100',
    // 服务模块
    SERVICE_MODULE: 'CM7000',

    // 定时服务类型 1-常规定时服务 2-单纯存储过程
    SCHEDULE_JOB_TYPE: 'SM1200',
    // 页码
    PAGE_NUM: 15,
    // 账户类型
    ACC_TYPE: 'AM9200',
    // 账户状态
    ACC_STATE: 'AM9300',
    // 核心账户类型
    AM_HEXIN_ACC_TYPE: 'AM9k00',
    // 人行账户状态
    HD_ACC_STATE: 'AM6600',
    // 久悬上报状态
    DORMANCY_REPORT_STATE: 'AM6200',
    // 对账频率
    AM_RECONCILIATION_FREQUENCY: 'AM7c00',
    // 对账结果
    AM_RECONCILIATION_RESULT: 'AM7d00',
    // 对账账户类型
    AM_RECONCILIATION_TYPE: 'AM7e00',
    // 对账渠道
    AM_RECONCILCHANNEL_TYPE: 'AM7f00',
    // 机构类型
    ORGAN_TYPE: 'OG1000',
    // 机构状态
    ORGAN_STATUS: 'OG2000',
    // add fkk 增加报备方式 20210719
    REPORTWAY: 'OG4000',
    // add fkk 增加行政区类型 20210721
    AREA_TYPE: 'OG5000',
    // add lzx 增加个人跑批报备 20211027
    PER_REPORT: 'OG6000',
    // 预警类型
    WARN_TYPE: 'AM6100',
    // 证件类型##0-开户证件、1-身份证件
    AM_PAPER_TYPE: 'AM6i00',
    // 账户类型
    AM_ACC_TYPE: 'AM6k00',
    // 身份证件类型
    CER_TYPE: 'AM5100',
    // 处理状态
    AM_WARN_STATUS: 'AM6h00',
    // 开更销标志
    HANDLE_TYPE: 'AM4300',
    // 报备状态
    REPORT_STATE: 'AM4400',
    // 存款人类别
    DEPO_TYPE: 'AM1200',
    // 风险等级
    AM_RISK_LEVEL: 'AM7h00',
    // 风险类型
    AM_RISK_TYPE: 'AMb100',
    // 是否手工解除
    AM_RISK_HADN: 'AM7i00',
    // 开销户预警-比对字段
    AM_OPER_COMPARE_FIELD: 'AM6c00',
    // 人行行业类型
    HD_TYPE: 'AM1500',
    // CNY_TYPE: 'AM7300',
    // 注册资金币种
    REG_CNY_TYPE: 'AM5300',
    // 法定代表人/单位负责人
    MANAGER_TYPE: 'AM5200',
    // 证明文件种类
    SACC_FILE_TYPE: 'AM5400',
    // 币种类型
    AM_CURRENCY_TYPE: 'AM5900',
    // 币种
    CNY_TYPE: 'AM7300',
    // 资金性质
    MONEY_TYPE: 'AM1400',
    // 取现标识
    CASH_SIGN: 'AM5800',
    // 申请开户的原因
    SACCREASON: 'AM5600',
    // 账户名称构成方式
    ACC_NAME_TYPE: 'AM5500',
    // 销户原因
    ACC_CLOSE_REASON: 'AM5700',
    // 机构信用代码证-登记注册号类型
    CODE_TYPE: 'AM3200',
    // 是否为待复核
    IS_CHECK: 'AM7F20',
    // 上报状态
    REPORT_STATES: 'AM9a00',
    // 年检状态
    ANNUAL_STATE: 'AM9100',
    // 状态确认
    CONFIRM_STATE: 'AM9400',
    // 是否手工年检
    IS_HAND: 'AM9800',
    // 规则类型
    AM_ANNUAL_TYPE: 'AM9e00'
  }
  if (flag === 'get') {
    if (flagChange) {
      dictionary = store.state.common.dictionaryConst
    }
    return dictionary[obj]
  } else {
    dictionary = Object.assign({}, dictionary, obj)
    store.dispatch('common/dictionary', dictionary)
    flagChange = true
  }
}

/**
 * 树形数据转换 角色
 * @param {*} data
 */
export function treeDataTranslate(data) {
  const id = 'role_no'
  const pid = 'role_mode'
  const name = 'role_name'
  // 建立个树形结构,需要定义个最顶层的父节点，pId是1
  let parents = []
  let roleTypeList = []
  const dataDic = dictionaryFieds('ROLE_MODE')
  for (let i = 0; i < data.length; i++) {
    if (roleTypeList.indexOf(data[i].role_mode) === -1) {
      const roleTypeMap = {
        label: dataDic[data[i].role_mode * 1 - 1].label,
        id: data[i].role_mode,
        pid: '00000',
        children: []
      }
      roleTypeList = [...roleTypeList, data[i].role_mode]
      parents = [...parents, roleTypeMap]
    }
  }
  // 调用子节点方法,参数为父节点的数组
  const datas = children(parents, data, id, pid, name)
  return datas
}

/**
 * 树形数据转换
 * @param {*} parent
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 * @param {*} name
 */
function children(parent, data, id, pid, name) {
  if (data === undefined) {
    return []
  }
  if (parent.length === 0) {
    return
  }
  if (data.length !== 0) {
    for (let i = 0; i < parent.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (parent[i].id === data[j][pid]) {
          const obj = {
            label: data[j][id] + '-' + data[j][name],
            id: data[j][id],
            pid: data[i][pid],
            children: []
          }
          parent[i].children.push(obj)
        }
      }
      children(parent[i].children, data, id, pid, name)
    }
  }
  return parent
}

/**
 * 获取organ_no下的所有机构
 * @param {*} organ_no 机构号*/
export function treeDataOrgan(organ_no) {
  const data = store.getters.organTree
  let dataNode = []
  for (const key of data) {
    if (key.id === organ_no) {
      dataNode = [key]
      break
    } else {
      if (key.children) {
        dataNode = organTreeChildren(key.children, organ_no)
      }
    }
  }
  return dataNode
}
/**
 * 获取organ_no下的所有机构 子节点遍历
 * @param {*} organ_no 机构号*/
function organTreeChildren(data, organ_no) {
  if (data.length === 0) {
    return []
  }
  let dataNode = []
  for (const key of data) {
    if (key.id === organ_no) {
      dataNode = [key]
      break
    } else {
      if (key.children) {
        organTreeChildren(key.children, organ_no)
      }
    }
  }
  return dataNode
}

/* ---------------字典 begin --------------- */
/**
 * 通过value，获取label
 * @param {Array} data 字典
 * @param {String} value 值
 */
export function getDataValue(data, value) {
  for (const key of data) {
    if (key.value === value) {
      return key
    }
  }
}
/**
 * 通过label，获取value
 * @param {Array} data 字典
 * @param {String} label 值
 */
export function getDataLabel(data, label) {
  for (const key of data) {
    if (key.label === label) {
      return key
    }
  }
}
/**
 * 菜单 显示方式
 */
export const home_show = [
  { value: '0', label: '仅在菜单显示' },
  { value: '1', label: '同时在菜单首页显示' },
  { value: '2', label: '仅在首页显示' }
]
/**
 * 按钮配置
 */
export const btnDatas = [
  { value: 'btnQuery', label: '查询' },
  { value: 'btnAdd', label: '新增' },
  { value: 'btnModify', label: '修改' },
  { value: 'btnDelete', label: '删除' },
  { value: 'btnLoginOut', label: '强制登出' },
  { value: 'btnBatch', label: '批量配置' },
  { value: 'btnResetPsd', label: '重置密码' },
  { value: 'btnEnableDisable', label: '启用/停用' },
  { value: 'btnSave', label: '保存' },
  { value: 'btnCancle', label: '取消' },
  { value: 'btnSubmit', label: '提交' },
  { value: 'btnCheckBtn', label: '查看页面按钮' },
  { value: 'btnOperatorBtn', label: '编辑页面按钮' },
  { value: 'btnReset', label: '重置' },
  { value: 'btnWatchpsd', label: '查看密码' },
  { value: 'btnReportAdd', label: '报备新增' },
  { value: 'btnPrev', label: '上一步' },
  { value: 'btnNext', label: '下一步' },
  { value: 'btnPrint', label: '打印' },
  { value: 'btnImport', label: '导入' },
  { value: 'btnExport', label: '导出' },
  { value: 'btnHandreport', label: '手动报备' },
  { value: 'btnDownload', label: '下载' },
  { value: 'editAccType', label: '修改账户类型' },
  { value: 'btnReport', label: '线下报备' },
  { value: 'btnEmpty', label: '清空' },
  { value: 'btnChangeState', label: '更改状态' },
  { value: 'btnPrintBasicAccount', label: '打印基本存款账户信息' },
  { value: 'btnPrintPassword', label: '打印基本存款人密码' },
  { value: 'btnHanging', label: '久悬上报' },
  { value: 'btnSynchro', label: '同步' },
  { value: 'btnRelieve', label: '解除' },
  { value: 'btnCheckOut', label: '复核' },
  { value: 'btnhandCheck', label: '手工年检' }
]
/* ---------------字典 end --------------- */
