import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表单
export const config = (that) => ({
  oper_type: {
    component: 'select',
    label: '操作类型',
    colSpan: 8,
    name: 'oper_type',
    config: {},
    componentProps: {
      clearable: true
    },
    options: dictionaryFieds('HANDLE_TYPE')
  },
  acc_type: {
    component: 'select',
    label: '账户类型',
    colSpan: 8,
    name: 'acc_type',
    config: {},
    componentProps: {
      clearable: true
    },
    options: dictionaryFieds('ACC_TYPE')
  },
  organ_no: {
    component: 'select-tree',
    label: '报备机构',
    colSpan: 8,
    name: 'organ_no',
    config: {
      // rules: [{ required: true }]
    },
    componentProps: {
      // input组件配置
      clearable: true,
      filterable: true
    },
    options: []
  },

  report_state: {
    component: 'select',
    label: '报备状态',
    colSpan: 8,
    name: 'report_state',
    config: {},
    componentProps: {
      clearable: true
    },
    options: dictionaryFieds('REPORT_STATE')
  },
  date_two: {
    component: 'date-picker',
    label: '交易日期',
    colSpan: 8,
    name: 'date_two',
    config: {},
    componentProps: {
      type: 'daterange',
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyyMMdd'
    }
  },
  acc_no: {
    component: 'input',
    label: '账号',
    colSpan: 8,
    name: 'acc_no',
    config: {},
    componentProps: {}
  },
  cus_no: {
    component: 'input',
    label: '客户号',
    colSpan: 8,
    name: 'cus_no',
    config: {},
    componentProps: {}
  }
})
