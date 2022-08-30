// 日期格式化

import Moment from 'moment'
/**
 * 获取当前日期
 */
export function dateNowFormat() {
  return Moment(new Date()).format('YYYYMMDDHHmmss')
}
