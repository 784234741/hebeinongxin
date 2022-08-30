
// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '机构',
    colSpan: 8,
    name: 'organ_no',
    componentProps: { // input组件配置
      clearable: true
    },
    options: []
  },
  acc_no: {
    component: 'input',
    label: '账号',
    colSpan: 8,
    name: 'acc_no',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      clearable: true
    }
  },
  this_level: {
    component: 'select',
    label: '风险等级',
    colSpan: 8,
    name: 'this_level',
    config: {
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: []
  }
})
