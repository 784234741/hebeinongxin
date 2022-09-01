import { dictionaryFieds } from '@/utils/dictionary' // 字典配置

// 表单配置
export const config = () => {
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
      options: dictionaryFieds('AM9100', true)
    }
  }
}
