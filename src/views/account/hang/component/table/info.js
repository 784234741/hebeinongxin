import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账号',
    id: uuidv1()
  },
  {
    name: 'bk_state',
    label: '行内账户状态',
    id: uuidv1()
  },
  {
    name: 'hd_state',
    label: '人行账户状态',
    id: uuidv1()
  },
  {
    name: 'report_state',
    label: '上报状态',
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '机构',
    id: uuidv1()
  }
]
