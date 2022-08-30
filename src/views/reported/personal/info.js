// 表单
export const config = (that) => ({

  organ_no: {
    component: 'select-tree',
    label: '机构',
    colSpan: 8,
    name: 'organ_no',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },

  ser_type: {
    component: 'select',
    label: '报备状态',
    colSpan: 8,
    name: 'report_state',
    config: {},
    componentProps: {
      placehodler: '请选择',
      clearable: true
    },
    options: [
      { label: '0-未报备', value: '0' },
      { label: '1-报备成功', value: '1' },
      { label: '2-报备失败', value: '2' }
    ]
  },

  create_year: {
    component: 'date-picker',
    label: '报备日期',
    colSpan: 8,
    name: 'create_year',
    config: {},
    componentProps: {
      placehodler: '请选择',
      type: 'daterange',
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyyMMdd'
      // type: 'year'
    }
  }
})
