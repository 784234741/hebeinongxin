// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '机构号',
    colSpan: 6,
    name: 'organ_no',
    componentProps: {
      clearable: true
    },
    options: []
  },
  user_no: {
    component: 'input',
    label: '用户号',
    colSpan: 6,
    name: 'user_no',
    config: {},
    componentProps: {
      placehodler: '支持模糊查询',
      clearable: true
    }
  },
  is_open: {
    component: 'select',
    label: '启用标志',
    colSpan: 6,
    name: 'is_open',
    config: {},
    componentProps: {
      clearable: true
    },
    options: []
  }
})
