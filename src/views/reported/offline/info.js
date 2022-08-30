// 表单
export const config = (that) => ({
  oper_type: {
    component: 'select',
    label: '开变销标志',
    colSpan: 8,
    name: 'oper_type',
    config: {},
    componentProps: {
      placehodler: '请选择',
      clearable: true
    }
  },
  acc_type: {
    component: 'select',
    label: '账户类型',
    colSpan: 8,
    name: 'acc_type',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: []
  },
  open_organ: {
    component: 'select-tree',
    label: '开户机构',
    colSpan: 8,
    name: 'open_organ',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  date_two: {
    component: 'date-picker',
    label: '交易日期',
    colSpan: 8,
    name: 'date_two',
    config: {},
    componentProps: {
      type: 'daterange',
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyyMMdd'
    }
  }
})
