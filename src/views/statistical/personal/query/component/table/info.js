import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'open_date',
    label: '开户日期',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'acc_open_totall1',
    label: '一类开户数量',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'acc_open_totall2',
    label: '二类开户数量',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'acc_open_totall3',
    label: '三类开户数量',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'comp_lv1',
    label: '比较上月一类户变化率',
    id: uuidv1()
  },
  {
    name: 'comp_lv2',
    label: '比较上月二类变化率',
    id: uuidv1()
  },
  {
    name: 'comp_lv2',
    label: '比较上月三类变化率',
    id: uuidv1()
  }
]
