import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表单
export const config = (that) => ({
  cus_organ: {
    component: 'select-tree',
    label: '机构',
    colSpan: 8,
    name: 'cus_organ',
    config: {
      // rules: [{ required: true }]
    },
    componentProps: {
      // input组件配置
      // clearable: true
    },
    options: []
  },
  legal_name: {
    component: 'input',
    label: '法人名称',
    colSpan: 8,
    name: 'legal_name',
    config: {},
    componentProps: {
    }
  },
  legal_type: {
    component: 'select',
    label: '法人证件类型',
    colSpan: 8,
    name: 'legal_type',
    config: {},
    componentProps: {},
    options: dictionaryFieds('CER_TYPE')
  },
  legal_id: {
    component: 'input',
    label: '法人证件号码',
    colSpan: 8,
    name: 'legal_id',
    config: {},
    componentProps: {
    }
  }
})
