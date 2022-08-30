
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
  reg_adr: {
    component: 'input',
    label: '注册地址',
    colSpan: 8,
    name: 'reg_adr',
    config: {},
    componentProps: {
    }
  }
})
