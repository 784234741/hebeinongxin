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
    label: '机构号',
    id: uuidv1()
  },
  {
    name: 'open_date',
    label: '业务日期',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'report_date',
    label: '报备日期',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'file_name',
    label: '报备文件',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'report_state',
    label: '报备状态',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'report_msg',
    label: '失败原因',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'toi_num',
    label: '总记录数',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'succ_num',
    label: '处理成功记录数',
    width: 150,
    id: uuidv1()
  },
  {
    name: 'fail_num',
    label: '处理失败记录数',
    width: 150,
    id: uuidv1()
  }
]
