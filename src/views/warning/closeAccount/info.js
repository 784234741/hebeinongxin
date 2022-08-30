
// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '机构',
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
  }
})
