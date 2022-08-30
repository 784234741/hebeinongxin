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
  create_year: {
    component: 'date-picker',
    label: '考核年份',
    colSpan: 8,
    name: 'create_year',
    config: {},
    componentProps: {
      placehodler: '请选择',
      type: 'year',
      valueFormat: 'yyyy'
    }
  }
})
