import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'organ_no',
    label: '机构',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'open_date',
    label: '统计日期',

    id: uuidv1()
  },
  {
    name: 'unit_acc_count',
    label: '单位银行账户数',

    id: uuidv1()
  },
  {
    name: 'basic_acc_count',
    label: '基本存款账户数量',

    id: uuidv1()
  },
  {
    name: 'normal_acc_count',
    label: '一般存款账户数量',

    id: uuidv1()
  },
  {
    name: 'temp_acc_count',
    label: '临时存款账户数量',

    id: uuidv1()
  },
  {
    name: 'special_acc_count',
    label: '专用存款账户数量',

    id: uuidv1()
  },
  {
    name: 'ordinary_acc_count',
    label: '普通开户数量',
    id: uuidv1()
  },
  {
    name: 'simple_acc_count',
    label: '简易开户数量',
    id: uuidv1()
  }
]
