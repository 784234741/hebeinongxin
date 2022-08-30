import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
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
    name: 'acc_name',
    label: '账户名称',
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    id: uuidv1()
  },
  {
    name: 'oper_type',
    label: '开变销标志',
    id: uuidv1()
  },
  {
    name: 'report_state',
    label: '报备状态',
    id: uuidv1()
  },
  {
    name: 'trans_date',
    label: '报备日期',
    id: uuidv1()
  },
  {
    name: 'sys_type',
    label: '系统类型',
    id: uuidv1()
  }
]

// 线下报备弹出框表单
export const config = (that) => ({
  acc_no: {
    component: 'input',
    label: '账号',
    colSpan: 12,
    name: 'acc_no',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    }
  },
  acc_name: {
    component: 'input',
    label: '账户名称',
    colSpan: 12,
    name: 'acc_name',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    }
  },
  report_state: {
    component: 'select',
    label: '报备状态',
    colSpan: 12,
    name: 'report_state',
    config: {
      rules: [{ required: true, message: '报备状态为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    },
    options: dictionaryFieds('REPORT_STATE')
  },
  acc_type: {
    component: 'select',
    label: '账户类型',
    colSpan: 12,
    name: 'acc_type',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    },
    options: dictionaryFieds('ACC_TYPE')
  },
  organ_no: {
    component: 'select-tree',
    label: '开户机构',
    colSpan: 12,
    name: 'organ_no',
    componentProps: {
      // input组件配置
      clearable: true,
      disabled: true
    },
    options: []
  },
  oper_type: {
    component: 'select',
    label: '开变销标志',
    colSpan: 12,
    name: 'oper_type',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    },
    options: dictionaryFieds('HANDLE_TYPE')
  },
  report_date: {
    component: 'input',
    label: '报备日期',
    colSpan: 12,
    name: 'report_date',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    }
  },
  pbc_organ_no: {
    component: 'input',
    label: '人行机构',
    colSpan: 12,
    name: 'pbc_organ_no',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    }
  },
  acc_state: {
    component: 'select',
    label: '账户状态',
    colSpan: 12,
    name: 'acc_state',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    },
    options: dictionaryFieds('ACC_STATE')
  },
  trans_date: {
    component: 'input',
    label: '交易日期',
    colSpan: 12,
    name: 'trans_date',
    config: {},
    componentProps: {
      clearable: true,
      disabled: true
    }
  }
})
