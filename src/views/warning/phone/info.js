
// 表单
export const config = (that) => ({
  cus_organ: {
    component: 'select-tree',
    label: '机构号',
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
  auth_phone: {
    component: 'input',
    label: '认证手机号',
    colSpan: 8,
    name: 'auth_phone',
    config: {
    },
    componentProps: {
      // input组件配置
      // clearable: true
    }
  }
})
