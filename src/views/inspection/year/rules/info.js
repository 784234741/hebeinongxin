import { dictionaryFieds } from '@/utils/dictionary' // 字典配置

// 表单配置
export const config = () => {
  return {
    organ_no: {
      component: 'select-tree',
      label: '机构号',
      colSpan: 8,
      name: 'organ_no',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: []
    },
    rule_no: {
      component: 'input',
      label: '规则编号',
      colSpan: 8,
      name: 'rule_no',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        placeholder: '支持模糊查询'
      }
    },
    rule_desc: {
      component: 'input',
      label: '规则描述',
      colSpan: 8,
      name: 'rule_desc',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        placeholder: '支持模糊查询'
      }
    },
    is_open: {
      component: 'select',
      label: '启用标志',
      colSpan: 8,
      name: 'is_open',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('IS_OPEN')
    },
    rule_type: {
      component: 'select',
      label: '规则类型',
      colSpan: 8,
      name: 'rule_type',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('AM_ANNUAL_TYPE')
    }
  }
}
