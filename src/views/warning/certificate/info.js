import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '机构号',
    colSpan: 8,
    name: 'organ_no',
    config: {
      // rules: [{ required: true }]
    },
    componentProps: {
      // input组件配置
      // clearable: true
    },
    options: []
  },
  // acc_no: {
  //   component: 'input',
  //   label: '账号',
  //   colSpan: 8,
  //   name: 'acc_no',
  //   config: {},
  //   componentProps: {
  //     placeholder: '支持模糊查询'
  //   }
  // },
  paper_type: {
    component: 'select',
    label: '证件类型',
    colSpan: 8,
    name: 'paper_type',
    config: {},
    componentProps: {},
    options: dictionaryFieds('AM_PAPER_TYPE')
  },
  warn_type: {
    component: 'select',
    label: '预警类型',
    colSpan: 8,
    name: 'warn_type',
    config: {},
    componentProps: {},
    options: dictionaryFieds('WARN_TYPE')
  }
})
