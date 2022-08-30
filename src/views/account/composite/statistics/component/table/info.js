import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'organ_no',
    label: '开户机构',
    width: 280,
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '客户名称',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账户',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'check_date',
    label: '账期',
    id: uuidv1()
  },
  {
    name: 'check_frequency',
    label: '对账频率',
    id: uuidv1()
  },
  {
    name: 'check_result',
    label: '对账结果',
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    id: uuidv1()
  },
  {
    name: 'check_channel',
    label: '对账渠道',
    id: uuidv1()
  }
]
