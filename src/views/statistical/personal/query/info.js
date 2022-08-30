// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '所属机构',
    colSpan: 8,
    name: 'organ_no',
    config: { // form-item 配置
    },
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  open_mon: {
    component: 'date-picker',
    label: '用户号',
    colSpan: 8,
    name: 'user_no',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      placehodler: '支持模糊查询',
      clearable: true
    }
  }
})
