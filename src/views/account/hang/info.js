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
  /*   bk_state: {
    component: 'select',
    label: '行内账户状态',
    colSpan: 8,
    name: 'bk_state',
    config: {},
    componentProps: {
      placehodler: '请选择',
      clearable: true
    }
  }, */
  hd_state: {
    component: 'select',
    label: '人行账户状态',
    colSpan: 8,
    name: 'hd_state',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: []
  },
  report_state: {
    component: 'select',
    label: '上报状态',
    colSpan: 8,
    name: 'report_state',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: []
  },
  acc_no: {
    component: 'input',
    label: '账号',
    colSpan: 8,
    name: 'acc_no',
    config: {},
    componentProps: {
      placehodler: '请选择',
      clearable: true
    }
  }
})
