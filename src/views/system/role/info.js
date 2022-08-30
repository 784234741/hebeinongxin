
// 表单
export const config = (that) => ({
  'role_no': {
    component: 'input',
    label: '角色号',
    colSpan: 12,
    name: 'role_no',
    config: {},
    componentProps: {
      placehodler: '支持角色号、角色名称模糊查询',
      filterable: true,
      clearable: true
    }
  },
  'organ_level': {
    component: 'select',
    label: '角色机构',
    colSpan: 12,
    name: 'organ_level',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: []
  },
  'role_mode': {
    component: 'select',
    label: '角色类别',
    colSpan: 12,
    name: 'role_mode',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: []
  },
  'is_open': {
    component: 'select',
    label: '启用标志',
    colSpan: 12,
    name: 'is_open',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: []
  }
})
