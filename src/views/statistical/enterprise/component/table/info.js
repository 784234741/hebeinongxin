import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'organ_no',
    label: '银行机构名称',
    id: uuidv1()
  },
  {
    name: 'open_date',
    label: '年月份',
    id: uuidv1()
  },
  {
    name: 'enterprise_num',
    label: '企业（含非法人企业）',
    id: uuidv1()
  },
  {
    name: 'individual_business',
    label: '个体工商户',
    id: uuidv1()
  },
  {
    name: 'subtotal',
    label: '小计',
    id: uuidv1()
  },
  {
    name: 'month_subtotal',
    label: '上月小计',
    id: uuidv1()
  },
  {
    name: 'year_subtotal',
    label: '去年同期小计',
    id: uuidv1()
  },
  {
    name: 'from_last_month',
    label: '环比上月',
    id: uuidv1()
  },
  {
    name: 'compared_last_year',
    label: '同比去年',
    id: uuidv1()
  },
  {
    name: 'enterprise_num_sum',
    label: '企业（含非法人企业）',
    id: uuidv1()
  },
  {
    name: 'individual_business_sum',
    label: '个体工商户',
    id: uuidv1()
  },
  {
    name: 'year_subtotal_sum',
    label: '小计',
    id: uuidv1()
  },
  {
    name: 'year_subtotal_homo',
    label: '去年同期小计',
    id: uuidv1()
  },
  {
    name: 'compared_last_year_sum',
    label: '同比去年',
    id: uuidv1()
  }
]

