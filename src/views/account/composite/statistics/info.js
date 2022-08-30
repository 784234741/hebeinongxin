import { dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
// 表单
export const config = (that) => ({
  cus_name: {
    component: 'input',
    label: '客户名称',
    colSpan: 8,
    name: 'cus_name',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  check_date: {
    component: 'input',
    label: '账期',
    colSpan: 8,
    name: 'check_date',
    config: {},
    componentProps: {
      placehodler: '请选择'
    }
  },
  check_frequency: {
    component: 'select',
    label: '对账频率',
    colSpan: 8,
    name: 'check_frequency',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('AM_RECONCILIATION_FREQUENCY')
  },
  check_result: {
    component: 'select',
    label: '对账结果',
    colSpan: 8,
    name: 'check_result',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('AM_RECONCILIATION_RESULT')
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
    options: dictionaryFieds('AM_RECONCILIATION_TYPE')
  }
})
