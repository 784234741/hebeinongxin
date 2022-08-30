// 表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '机构号',
    colSpan: 8,
    name: 'organ_no',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  count_month: {
    component: 'date-picker',
    label: '统计月份',
    colSpan: 8,
    name: 'count_month',
    componentProps: {
      // input组件配置
      clearable: true,
      type: 'month',
      valueFormat: 'yyyy-MM'
    }
  }
})
