import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'organ_no',
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'cus_no',
    label: '客户号',
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '客户名称',
    id: uuidv1()
  },
  {
    name: 'paper_type',
    label: '证件类型',
    id: uuidv1()
  },
  {
    name: 'paper_no',
    label: '证件号码',
    id: uuidv1()
  },
  {
    name: 'warn_status',
    label: '详情',
    id: uuidv1()
  },
  {
    name: 'check_status',
    label: '核实状态',
    id: uuidv1()
  }
]

// 频繁开销户预警_详情弹出框_表单表头
export const configTable2 = (that) => [
  {
    name: 'acc_no',
    label: '账户号',
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '开户机构',
    id: uuidv1()
  },
  {
    name: 'close_organ',
    label: '销户机构',
    id: uuidv1()
  },
  {
    name: 'close_date',
    label: '销户日期',
    id: uuidv1()
  }
]
