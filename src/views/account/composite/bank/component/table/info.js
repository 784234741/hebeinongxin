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
    name: 'cus_no',
    label: '客户号',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '企业名称',
    id: uuidv1()
  },
  {
    name: 'ent_credit_no',
    label: '统一社会信用代码',
    id: uuidv1()
  },
  {
    name: 'legal_name',
    label: '法人',
    id: uuidv1()
  },
  {
    name: 'status',
    label: '经营状态',
    width: 80,
    id: uuidv1()
  },
  {
    name: 'start_date',
    label: '成立时间',
    width: 80,
    id: uuidv1()
  }
]

// 表头2
export const configTable2 = (that) => [
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
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账户',
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
    width: 80,
    id: uuidv1()
  },
  {
    name: 'acc_state',
    label: '账户状态',
    width: 80,
    id: uuidv1()
  }
]
export const configTable3 = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'cus_oper_type',
    label: '操作类型',
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '操作记录时间',
    id: uuidv1()
  },
  {
    name: 'cus_no',
    label: '客户编号',
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '客户名称',
    id: uuidv1()
  },
  {
    name: 'ent_credit_no',
    label: '统一社会信用代码',
    id: uuidv1()
  },
  {
    name: 'reg_no',
    label: '注册号',
    id: uuidv1()
  },

  {
    name: 'cus_type',
    label: '企业类型',
    id: uuidv1()
  },
  {
    name: 'legal_name',
    label: '法人',
    id: uuidv1()
  },
  {
    name: 'status',
    label: '经营状态',
    id: uuidv1()
  },

  {
    name: 'start_date',
    label: '成立时间',
    id: uuidv1()
  }
]

export const configTable4 = (that) => [
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
    name: 'acc_no',
    label: '账户',
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    id: uuidv1()
  },
  {
    name: 'year_no',
    label: '年检年度',
    id: uuidv1()
  },
  {
    name: 'annual_state',
    label: '年检状态',
    id: uuidv1()
  },
  {
    name: 'annual_date',
    label: '年检日期',
    id: uuidv1()
  },

  {
    name: 'is_hand',
    label: '是否手工年检',
    id: uuidv1()
  },
  {
    name: 'confirm_state',
    label: '状态确认',
    id: uuidv1()
  },
  {
    name: 'confirm_date',
    label: '确认日期',
    id: uuidv1()
  },

  {
    name: 'is_hand',
    label: '是否手工年检',
    id: uuidv1()
  },
  {
    name: 'confirm_state',
    label: '状态确认',
    id: uuidv1()
  },
  {
    name: 'confirm_date',
    label: '确认日期',
    id: uuidv1()
  },
  {
    name: 'phone',
    label: '联系方式',
    id: uuidv1()
  }
]
// 表头
export const configTable5 = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账号',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    id: uuidv1()
  },
  {
    name: 'oper_type',
    label: '操作类型',
    id: uuidv1()
  },
  {
    name: 'trans_date',
    label: '交易日期',
    id: uuidv1()
  },

  {
    name: 'report_state',
    label: '报备状态',
    id: uuidv1()
  },
  {
    name: 'report_date',
    label: '报备日期',
    id: uuidv1()
  },
  {
    name: 'check_state',
    label: '核准状态',
    id: uuidv1()
  },

  {
    name: 'report_reason',
    label: '失败原因',
    id: uuidv1()
  },
  {
    name: 'sys_type',
    label: '系统类型',
    id: uuidv1()
  },
  {
    name: 'report_detail',
    label: '报备详情',
    id: uuidv1()
  }
]

// 表头
export const configTable6 = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'check_no',
    label: '尽调编号',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'ent_name',
    label: '企业名称(或统一社会信用代码)',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '尽调机构',
    id: uuidv1()
  },
  {
    name: 'is_lock',
    label: '操作柜员',
    id: uuidv1()
  },
  {
    name: 'oper_time',
    label: '操作时间',
    id: uuidv1()
  },

  {
    name: 'operate',
    label: '操作',
    id: uuidv1()
  }
]
