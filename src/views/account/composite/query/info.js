import { dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
// 表单
export const config = (that) => ({
  open_organ: {
    component: 'select-tree',
    label: '开户机构',
    colSpan: 8,
    name: 'open_organ',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  acc_no: {
    component: 'input',
    label: '账号',
    colSpan: 8,
    name: 'acc_no',
    config: {},
    componentProps: {
      placehodler: '请选择'
    }
  },
  acc_type: {
    component: 'select',
    label: '账户类型',
    colSpan: 8,
    name: 'acc_type',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('ACC_TYPE')
  },
  acc_state: {
    component: 'select',
    label: '账户状态',
    colSpan: 8,
    name: 'acc_state',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('ACC_STATE')
  },
  open_date: {
    component: 'date-picker',
    label: '开户时间',
    colSpan: 8,
    name: 'open_date',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      type: 'daterange',
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyyMMdd'
    },
    options: []
  },
  acc_name: {
    component: 'input',
    label: '账户名称',
    colSpan: 8,
    name: 'acc_name',
    config: {},
    componentProps: {
      placehodler: '请选择'
    }
  }
})
