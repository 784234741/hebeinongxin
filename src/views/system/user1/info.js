
// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '所属机构',
    colSpan: 8,
    name: 'organ_no',
    componentProps: { // input组件配置
      clearable: true
    },
    options: []
  },
  user_no: {
    component: 'input',
    label: '用户号',
    colSpan: 8,
    name: 'user_no',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      placehodler: '支持模糊查询',
      clearable: true
    }
  },
  login_mode: {
    component: 'select',
    label: '登录方式',
    colSpan: 8,
    name: 'login_mode',
    config: {
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: []
  },
  login_state: {
    component: 'select',
    label: '登录状态',
    colSpan: 8,
    name: 'login_state',
    config: {
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: []
  },
  role_no: {
    component: 'select-tree',
    label: '角色号',
    colSpan: 8,
    name: 'role_no',
    componentProps: { // input组件配置
      clearable: true,
      multiple: true
    },
    options: []
  },
  user_status: {
    component: 'select',
    label: '用户状态',
    colSpan: 8,
    name: 'user_status',
    config: {
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: []
  }
})
