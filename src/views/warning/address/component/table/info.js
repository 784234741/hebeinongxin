import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'cus_organ',
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'reg_adr',
    label: '注册地址',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'cus_count',
    label: '关联企业数量',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'report_detail',
    label: '详情',
    width: 80,
    id: uuidv1()
  }
]

// 表头
export const configTable2 = (that) => [
  {
    name: 'cus_organ',
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'cus_no',
    label: '客户号',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '客户名称',
    width: 240,
    id: uuidv1()
  },
  {
    name: 'reg_adr',
    label: '注册地址',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'warn_status',
    label: '核实状态',
    width: 100,
    id: uuidv1()
  }
]

// 表头
export const configTable3 = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'open_organ',
    label: '开户机构',
    id: uuidv1()
  },
  {
    name: 'open_date',
    label: '开户日期',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账户',
    width: 240,
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    width: 140,
    id: uuidv1()
  },
  {
    name: 'acc_state',
    label: '账户状态',
    width: 180,
    id: uuidv1()
  }
]
