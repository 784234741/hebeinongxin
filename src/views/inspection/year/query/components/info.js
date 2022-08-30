import { v1 as uuidv1 } from 'uuid'
// table表头
export const column = () => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'open_organ',
    label: '开户机构',
    // width: 180,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账号',
    // width: 120,
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    // width: 120,
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
    name: 'report_state',
    label: '上报状态',
    id: uuidv1()
  },
  {
    name: 'report_date',
    label: '上报日期',
    id: uuidv1()
  },
  {
    name: 'phone',
    label: '联系方式',
    id: uuidv1()
  }
]

// 账号详情弹框label和name
export const configDetail = () => {
  return [
    {
      title: '账户信息',
      arr: [
        { label: '账号', name: 'acc_no' },
        { label: '账户名称', name: 'acc_name' },
        { label: '开户日期', name: 'open_date' },
        { label: '开户机构', name: 'open_organ' },
        { label: '账户类型', name: 'acc_type' },
        { label: '账户状态', name: 'acc_state' },
        { label: '币种', name: 'scur_type' },
        { label: '久悬标识', name: 'susp_state' },
        { label: '销户日期', name: 'close_date' },
        { label: '到期日期', name: 'expire_date' }
      ]
    },
    {
      title: '客户信息',
      arr: [
        { label: '开户许可证核准号', name: 'license_no' },
        { label: '统一社会信用代码', name: 'ent_credit_no' },
        { label: '客户名称', name: 'cus_name' },
        { label: '客户类型', name: 'cus_type' },
        { label: '注册资本', name: 'reg_money' },
        { label: '成立日期', name: 'start_date' },
        { label: '注销日期', name: 'end_date' },
        { label: '注册地址', name: 'reg_adr' },
        { label: '经营范围', name: 'reg_scope' },
        { label: '人行行业类型', name: 'hd_type' },
        { label: '存款人类别', name: 'depo_type' },
        { label: '地区代码', name: 'adr_id' },
        { label: '邮政编码', name: 'zcode' },
        { label: '法人', name: 'legal_name' },
        { label: '法人证件号', name: 'legal_id' },
        { label: '法人联系电话', name: 'legal_phone' },
        { label: '法人证件到期日', name: 'legal_end' },
        { label: '经办人', name: 'agent_name' },
        { label: '经办人证件号', name: 'agent_id' },
        { label: '经办人联系电话', name: 'agent_phone' },
        { label: '经办人证件到期日', name: 'agent_end' },
        { label: '组织机构代码', name: 'org_no' }
      ]
    }
  ]
}

// 年检详情弹框
export const stateColumn = () => [
  {
    name: 'field_id',
    label: '对比字段',
    id: uuidv1()
  },
  {
    name: 'core_val',
    label: '核心数据',
    id: uuidv1()
  },
  {
    name: 'hd_val',
    label: '人行数据',
    id: uuidv1()
  },
  {
    name: 'ser_val',
    label: '服务商数据',
    id: uuidv1()
  }
]
