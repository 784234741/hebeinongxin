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
    name: 'organ_no',
    label: '机构',
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

// 频繁挂失补卡预警_详情弹出框_表单表头
export const configTable2 = (that) => [
  {
    name: 'DAT_POST',
    label: '变更日期',
    id: uuidv1()
  },
  {
    name: 'BE_ACC_NO',
    label: '变更前账号',
    id: uuidv1()
  },
  {
    name: 'AF_ACC_NO',
    label: '变更后账号',
    id: uuidv1()
  },
  {
    name: 'DEAL_ORGAN',
    label: '交易机构',
    id: uuidv1()
  }
]
