// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '机构号',
    colSpan: 8,
    name: 'organ_no',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  open_mon: {
    component: 'date-picker',
    label: '统计月份',
    colSpan: 8,
    name: 'open_mon',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      placehodler: '支持模糊查询',
      clearable: true,
      type: 'month',
      valueFormat: 'yyyy-MM'
    }
  }
})
