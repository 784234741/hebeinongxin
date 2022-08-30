/* 自定义过滤器 */

import Moment from 'moment'
import store from '@/store'
import { dictionaryFieds } from '@/utils/dictionary'
import { commonBlank } from '@/utils/common'

/**
 * 数字格式
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

/**
 * 数字三位格式化 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 首字符大写
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 日期格式化
 * @param {String} string
 */
export function dateTimeFormat(string) {
  if (string !== '') {
    string = Moment(string, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
  }
  return string
}
/**
 * 日期格式化
 * @param {String} string
 */
export function date10Format(string) {
  if (!commonBlank(string)) {
    string = Moment(string, 'YYYY-MM-DD').format('YYYY-MM-DD')
  }
  return string
}
/**
 * 日期格式化
 * @param {String} string
 */
export function date8Format(string) {
  if (string !== '') {
    string = Moment(string, 'YYYYMMDD').format('YYYYMMDD')
  }
  return string
}

/**
 * 机构信息获取
 * @param {String} string: 机构号
 */
export function organNameFormat(string) {
  if (commonBlank(store.getters.organTreeObject[string])) {
    // console.log('organNameFormat', string)
  }

  return commonBlank(string)
    ? ''
    : commonBlank(store.getters.organTreeObject[string])
      ? ''
      : store.getters.organTreeObject[string].name
}

/**
 * 机构信息获取
 * @param {String} string: 机构号
 */
export function organNameFormats(string) {
  if (commonBlank(store.getters.organTreeObject[string])) {
    // console.log('organNameFormat', string)
  }

  return commonBlank(string)
    ? string
    : commonBlank(store.getters.organTreeObject[string])
      ? string
      : store.getters.organTreeObject[string].name
}

/**
 * 下拉树label返显
 * @param {String} name: 字典名称
 * @param {String} string: key值*/
export function selectLabel(name, string) {
  const arrayState = dictionaryFieds(name)
  let valueS = ''
  arrayState.map(function(item) {
    if (item.value === string) {
      valueS = item.label
    }
  })
  return valueS
}

/**
 * 用户状态获取
 * @param {String} string: 用户状态*/
export function userState(string) {
  return selectLabel('USER_STATE', string)
}

/**
 * 登录方式
 * @param {String} string: 登录方式*/
export function loginType(string) {
  return selectLabel('USER_LOGIN_TYPE', string)
}

/**
 * 登录状态
 * @param {String} string: 登录状态*/
export function loginState(string) {
  return selectLabel('USER_LOGIN_STATE', string)
}

/**
 * 机构级别
 * @param {String} string: 机构级别*/
export function organLevel(string) {
  return selectLabel('ORGAN_LEVEL', string)
}

/**
 * 角色类别
 * @param {String} string: 角色类别*/
export function roleType(string) {
  return selectLabel('ROLE_MODE', string)
}

/**
 * 启用标志
 * @param {String} string: 启用标志*/
export function startSign(string) {
  return selectLabel('IS_OPEN', string)
}

/**
 * 用户系统类型
 * @param {String} string: 用户系统类型*/
export function reportSysType(string) {
  return selectLabel('REPORT_SYS_TYPE', string)
}

/**
 * 报备柜员类型
 * @param {String} string: 报备柜员类型*/
export function reportUserType(string) {
  return selectLabel('REPORT_USER_TYPE', string)
}

/**
 * 报备柜员类型
 * @param {String} string: 报备柜员类型*/
export function reportUserLevel(string) {
  return selectLabel('AM_REPORTUSER_LEVEL', string)
}

/**
 * 服务类型
 * @param {String} string: 服务类型*/
export function serverType(string) {
  return selectLabel('SERVER_TYPE', string)
}

/**
 * 服务类型
 * @param {String} string: 服务类型*/
export function irpType(string) {
  return selectLabel('IRP_TYPE', string)
}

/**
 * 服务模块
 * @param {String} string: 服务模块*/
export function serviceModule(string) {
  return selectLabel('SERVICE_MODULE', string)
}

/**
 * 账户类型
 * @param {String} string: 账户类型*/
export function accType(string) {
  return selectLabel('ACC_TYPE', string)
}

/**
 * 账户状态
 * @param {String} string: 账户状态*/
export function accState(string) {
  return selectLabel('ACC_STATE', string)
}

/**
 * 核心账户类型
 * @param {String} string: 核心账户类型*/
export function amHexinAccType(string) {
  return selectLabel('AM_HEXIN_ACC_TYPE', string)
}
/**
 * 人行账户状态
 * @param {String} string: 人行账户状态*/
export function hdState(string) {
  return selectLabel('HD_ACC_STATE', string)
}

/**
 * 对账频率
 * @param {String} string: 对账频率*/
export function checkFrequency(string) {
  return selectLabel('AM_RECONCILIATION_FREQUENCY', string)
}

/**
 * 对账结果
 * @param {String} string: 对账结果*/
export function checkResult(string) {
  return selectLabel('AM_RECONCILIATION_RESULT', string)
}

/**
 * 账户类型
 * @param {String} string: 账户类型*/
export function accType2(string) {
  return selectLabel('AM_RECONCILIATION_TYPE', string)
}

/**
 * 对账渠道
 * @param {String} string: 对账渠道*/
export function checkChannel(string) {
  return selectLabel('AM_RECONCILCHANNEL_TYPE', string)
}

/**
 * 机构类型
 * @param {String} string: 机构类型*/
export function organType(string) {
  return selectLabel('ORGAN_TYPE', string)
}

/**
 * 机构状态
 * @param {String} string: 机构状态*/
export function status(string) {
  return selectLabel('ORGAN_STATUS', string)
}

/**
 * 机构报备方式
 * @param {String} string: 机构报备方式*/
export function reportWay(string) {
  return selectLabel('REPORTWAY', string)
}

/**
 * 个人跑批报备
 * @param {String} string: 个人跑批报备*/
export function perReport(string) {
  return selectLabel('PER_REPORT', string)
}
/**
 * 开更销标志
 * @param {String} string: 开更销标志*/
export function handleType(string) {
  return selectLabel('HANDLE_TYPE', string)
}
/**
 * 报备状态
 * @param {String} string: 报备状态*/
export function repState(string) {
  return selectLabel('REPORT_STATE', string)
}

/**
 * 证件类型
 * @param {String} string: 证件类型*/
export function amPaperType(string) {
  return selectLabel('AM_PAPER_TYPE', string)
}

/**
 * 预警类型
 * @param {String} string: 预警类型*/
export function warnType(string) {
  return selectLabel('WARN_TYPE', string)
}

/**
 * 法人证件类型
 * @param {String} string: 法人证件类型*/
export function legalType(string) {
  return selectLabel('CER_TYPE', string)
}

/**
 * 法人证件类型
 * @param {String} string: 法人证件类型*/
export function warnStatus(string) {
  return selectLabel('AM_WARN_STATUS', string)
}

export function getMonth(string) {
  if (string !== '') {
    return Moment(string, 'YYYY-MM').format('YYYY-MM')
  }
  return string
}

/**
 * 风险等级
 * @param {String} string: 风险等级*/
export function riskLevel(string) {
  return selectLabel('AM_RISK_LEVEL', string)
}

/**
 * 风险类型
 * @param {String} string: 风险等级*/
export function riskType(string) {
  return selectLabel('AM_RISK_TYPE', string)
}

/**
 * 风险类型
 * @param {String} string: 风险等级*/
export function riskHand(string) {
  return selectLabel('AM_RISK_HADN', string)
}
/**
 * 久悬上报状态
 * @param {String} string: 久悬上报状态*/
export function reportState(string) {
  return selectLabel('DORMANCY_REPORT_STATE', string)
}

/**
 * 人行行业类型
 * @param {String} string: 人行行业类型*/
export function hdType(string) {
  return selectLabel('HD_TYPE', string)
}

/**
 * 币种种类
 * @param {String} string: 币种种类*/
export function cnyType(string) {
  return selectLabel('CNY_TYPE', string)
}

/**
 * 预警管理 证件类型
 * @param {String} string: 预警管理 证件类型*/
export function paperType2(string) {
  if (!commonBlank(string)) {
    const arr = [
      {
        label: '身份证',
        value: '0100'
      },
      {
        label: '临时居民身份证',
        value: '0101'
      },
      {
        label: '户口簿',
        value: '0102'
      },
      {
        label: '护照',
        value: '0103'
      },
      {
        label: '港澳居民往来内地通行证',
        value: '0104'
      },
      {
        label: '台湾同胞往来大陆通行证',
        value: '0105'
      },
      {
        label: '外国人永久居留证',
        value: '0106'
      },
      {
        label: '军官证',
        value: '0107'
      },
      {
        label: '警官证',
        value: '0108'
      },
      {
        label: '士兵证',
        value: '0109'
      },
      {
        label: '学生证',
        value: '0110'
      },
      {
        label: '驾驶证',
        value: '0111'
      },
      {
        label: '社会保障号',
        value: '0112'
      },
      {
        label: '离休干部荣誉证',
        value: '0113'
      },
      {
        label: '军官退休证',
        value: '0114'
      },
      {
        label: '文职干部退休证',
        value: '0115'
      },
      {
        label: '军事学员证',
        value: '0116'
      },
      {
        label: '边民出入境通行证',
        value: '0117'
      },
      {
        label: '外国人临时居留证',
        value: '0118'
      },
      {
        label: '港澳居民居住证',
        value: '0119'
      },
      {
        label: '其他个人证件',
        value: '0120'
      },
      {
        label: '台湾居民居住证',
        value: '0121'
      },
      {
        label: '文职干部退休证',
        value: '0122'
      },
      {
        label: '文职干部退休证',
        value: '0123'
      }
    ]
    return arr.filter((item) => item.value === string)[0].label
  } else {
    return string
  }
}
/**
 * 预警管理 核实状态
 * @param {String} string: 核实状态*/
export function checkStatus(string) {
  const arr = [
    {
      label: '未核实',
      value: '0'
    },
    {
      label: '正常',
      value: '1'
    }
  ]
  return arr.filter((item) => item.value === string)[0].label
}

/**
 * 注册资金币种
 * @param {String} string: 注册资金币种*/
export function regCnyType(string) {
  return selectLabel('REG_CNY_TYPE', string)
}

/**
 * 法定代表人/单位负责人
 * @param {String} string: 法定代表人/单位负责人*/
export function managerType(string) {
  return selectLabel('MANAGER_TYPE', string)
}

/**
 * 证明文件种类
 * @param {String} string: 证明文件种类*/
export function saccFileType(string) {
  return selectLabel('SACC_FILE_TYPE', string)
}

/**
 * 币种类型
 * @param {String} string: 币种类型*/
export function amCurrencyType(string) {
  return selectLabel('AM_CURRENCY_TYPE', string)
}

/**
 * 资金性质
 * @param {String} string: 资金性质*/
export function moneyType(string) {
  return selectLabel('MONEY_TYPE', string)
}

/**
 * 取现标识
 * @param {String} string: 取现标识
export function cashSign(string) {
  return selectLabel('CASH_SIGN', string)
}
 */
/**
 * 取现标识   报备详情
 * @param {String} string: 取现标识*/
export function bCashSign(string) {
  if (string === 'on') {
    return '可以取现'
  } else {
    return '不可取现'
  }
}

/**
 * 申请开户的原因
 * @param {String} string: 申请开户的原因*/
export function saccreason(string) {
  return selectLabel('SACCREASON', string)
}

/**
 * 账户名称构成方式
 * @param {String} string: 账户名称构成方式*/
export function accNameType(string) {
  return selectLabel('ACC_NAME_TYPE', string)
}

/**
 * 销户原因
 * @param {String} string: 销户原因*/
export function accCloseReason(string) {
  return selectLabel('ACC_CLOSE_REASON', string)
}
/**
 * 存款人类别
 * @param {String} string: 存款人类别*/
export function depoType(string) {
  return selectLabel('DEPO_TYPE', string)
}
/**
 * 机构信用代码证-登记注册号类型
 * @param {String} string: 机构信用代码证-登记注册号类型*/
export function codeType(string) {
  return selectLabel('CODE_TYPE', string)
}

// /**
//  * 人行行业类型
//  * @param {String} string: 人行行业类型*/
//  export function hdType(string) {
//   return selectLabel('HD_TYPE', string)
// }

/**
 * 是否为待复核
 */
export function isCheck(string) {
  return selectLabel('IS_CHECK', string)
}

/**
 * 用户级别
 */
export function userLevel(string) {
  return selectLabel('USER_LEVEL', string)
}

/**
 * 上报状态
 */
export function reportStates(string) {
  return selectLabel('REPORT_STATES', string)
}

/**
 * 年检状态
 */
export function annualState(string) {
  return selectLabel('ANNUAL_STATE', string)
}

/**
 * 状态确认
 */
export function confirmState(string) {
  return selectLabel('CONFIRM_STATE', string)
}

/**
 * 是否手工年检
 */
export function isHand(string) {
  return selectLabel('IS_HAND', string)
}

/**
 * 规则类型
 */
export function amAnnualType(string) {
  return selectLabel('AM_ANNUAL_TYPE', string)
}
