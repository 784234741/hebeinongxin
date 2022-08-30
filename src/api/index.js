// 所有接口配置
import { Login } from './login' // 登录
import { RouterRequest } from './router' // 左侧菜单
import { Common } from './common' // 公共配置

// 系统管理 begin
import { SysUser } from './views/system/user' // 用户管理
import { SysParams } from './views/system/config/params' // 参数设置

import { SysMenu } from './views/system/config/menu' // 菜单配置
import { SysDictionary } from './views/system/config/dictionary' // 数据字典
import { SysOrgan } from './views/system/organ' // 机构管理

import { SysRole } from './views/system/role' // 角色管理
import { SysApplication } from './views/system/config/application' // 应用服务配置
import { SysTiming } from './views/system/config/timing' // 定时服务配置
// 系统管理 end
// 统计查询 begin
import { Staacc } from './views/statistical/Staacc' // 账户服务管理配置
import { Staper } from './views/statistical/Staper' // 个人开户满意度监测
import { Staent } from './views/statistical/Staent' // 企业开户率监测统计
import { Staser } from './views/statistical/Staser' // 小微企业开户监测
import { EntSatisfied } from './views/statistical/entsatisfied' // 小微企业开户监测
// 统计查询 end

// 账户管理 begin
import { AccHang } from './views/account/hang' // 账户久悬管理
import { RiskLevel } from './views/account/level' // 账户分级分类
// 账户管理 end

// 账户管理 -综合管理 beign
import { SysAccInfo } from './views/account/composite/query' // 账户信息查询
import { SysCusInfo } from './views/account/composite/bank' // 行内客户信息查询
import { SysReconciliationInfo } from './views/account/composite/statistics' // 对账情况统计表
import { SysDialogController } from './views/home' // 对账情况统计表

// 账户管理 -综合管理 end

// 报备管理 begin
import { RepUser } from './views/reported/RepUser' // 报备用户配置
import { RepSys } from './views/reported/RepSys' // 报备系统配置
import { RepOff } from './views/reported/RepOff' // 线下报备
import { ReportInfo } from './views/reported/info' // 报备信息查询

// 报备管理 end

import { SysAssessment } from './views/assessment' // 账户服务与考核结果查询

// 预警管理 begin
import { WarningPapersWarn } from './views/warning/certificate' // 证件到期预警
import { WarningTemporaryWarn } from './views/warning/temporary' // 临时户到期预警
import { WarningLegalMulti } from './views/warning/personal' // 一人多企预警
import { WarningAnnualWarn } from './views/warning/year' // 一人多企预警
import { WarningAddrMulti } from './views/warning/address' // 一址多企预警
import { WarningReportSupple } from './views/warning/loss' // 频繁挂失补卡预警
import { WarningFrequentOpenClose } from './views/warning/closeAccount' // 频繁开销户预警
import { WarningPhoneMulti } from './views/warning/phone' // 一手机号多户预警
// 预警管理 end

// 统计分析 begin

import { SaPropaganda } from './views/statistical/propaganda' // 一手机号多户预警
import { SaAccQuery } from './views/statistical/accQuery' // 单位银行结算账户统计查询
import { SaPerAcc } from './views/statistical/query' // 单位银行结算账户统计查询
import { SaSituation } from './views/statistical/situation' // 单位银行结算账户统计查询
// 统计分析 end

// import { yearCheck } from './views/inspection/season' // 季检功能
import { yearCheck } from './views/inspection/year' // 年检功能

// 按需配置
export {
  Login,
  RouterRequest,
  SysUser,
  Common,
  SysParams,
  SysMenu,
  SysRole,
  SysDictionary,
  RepUser,
  RepSys,
  RepOff,
  SysApplication,
  SysTiming,
  SysAssessment,
  SysAccInfo,
  AccHang,
  SysCusInfo,
  SysReconciliationInfo,
  SysOrgan,
  SysDialogController,
  WarningPapersWarn,
  WarningTemporaryWarn,
  WarningAnnualWarn,
  WarningLegalMulti,
  WarningAddrMulti,
  WarningReportSupple,
  WarningFrequentOpenClose,
  WarningPhoneMulti,
  SaPropaganda,
  ReportInfo,
  RiskLevel,
  SaAccQuery,
  SaPerAcc,
  SaSituation,
  Staacc,
  Staper,
  Staent,
  Staser,
  EntSatisfied,
  yearCheck
}

// const apiAll = {
//   ...Login,
//   ...RouterRequest,
//   ...SysUser
// }
// // 全量配置
// export default apiAll
//
