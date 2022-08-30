import { dictionaryFieds } from '@/utils/dictionary'

// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '机构号',
    colSpan: 8,
    name: 'organ_no',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  organ_type: {
    component: 'select',
    label: '机构类型',
    colSpan: 8,
    name: 'organ_type',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('ORGAN_TYPE')
  },
  status: {
    component: 'select',
    label: '机构状态',
    colSpan: 8,
    name: 'status',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('ORGAN_STATUS')
  },
  report_way: {
    component: 'select',
    label: '机构报备方式',
    colSpan: 8,
    name: 'report_way',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('REPORTWAY')
  },
  per_report: {
    component: 'select',
    label: '个人跑批报备',
    colSpan: 8,
    name: 'per_report',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('PER_REPORT')
  },
  parent_organ: {
    component: 'select-tree',
    label: '上级机构',
    colSpan: 8,
    name: 'parent_organ',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: []
  }
})
