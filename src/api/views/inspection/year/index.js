import request from '@/utils/request'

// 年检功能相关接口
export const yearCheck = {
  yearQuery(data) {
    // 年检查询
    return request({
      url: '/annualInfo.do',
      method: 'post',
      data
    })
  },
  queryDetail(data) {
    // 查看详情
    return request({
      url: '/accInfo.do',
      method: 'post',
      data
    })
  },
  yearDateQuery(data) {
    // 年检日期查询
    return request({
      url: '/annualDate.do',
      method: 'post',
      data
    })
  },
  ruleQuery(data) {
    // 年检规则配置
    return request({
      url: '/annualRule.do',
      method: 'post',
      data
    })
  }
}
