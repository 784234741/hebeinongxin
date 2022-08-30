import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
export const config = (that) => {
  return {
    open_organ: {
      component: 'select-tree',
      label: '开户机构',
      colSpan: 8,
      name: 'open_organ',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: []
    },
    acc_no: {
      component: 'input',
      label: '账号',
      colSpan: 8,
      name: 'acc_no',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        placeholder: '支持模糊查询'
      }
    },
    acc_name: {
      component: 'input',
      label: '账户名称',
      colSpan: 8,
      name: 'acc_name',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        placeholder: '支持模糊查询'
      }
    },
    year_no: {
      component: 'select',
      label: '年检年度',
      colSpan: 8,
      name: 'year_no',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: [
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
        { label: '2020', value: '2020' }
      ]
    },
    annual_state: {
      component: 'select',
      label: '年检状态',
      colSpan: 8,
      name: 'annual_state',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('ANNUAL_STATE')
    },
    confirm_state: {
      component: 'select',
      label: '状态确认',
      colSpan: 8,
      name: 'confirm_state',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('CONFIRM_STATE')
    },
    report_state: {
      component: 'select',
      label: '上报状况',
      colSpan: 8,
      name: 'report_state',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('REPORT_STATES')
    }
  }
}
