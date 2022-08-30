import { v1 as uuidv1 } from 'uuid'

// 表头
export const configTable = (that) => [
  {
    name: 'acc_no',
    label: '账号',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '账户名称',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '机构',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'risk_type',
    label: '风险原因',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'risk_level',
    label: '风险等级',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'risk_reason',
    label: '备注',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '风险时间',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'is_review',
    label: '待复核',
    id: uuidv1()
  }
]

