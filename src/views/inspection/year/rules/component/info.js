import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表头
export const column = () => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'rule_no',
    label: '规则编号',
    id: uuidv1()
  },
  {
    name: 'rule_desc',
    label: '规则描述',
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '机构号',
    id: uuidv1()
  },
  {
    name: 'user_name',
    label: '配置柜员',
    id: uuidv1()
  },
  {
    name: 'prio_level',
    label: '权重',
    id: uuidv1()
  },
  {
    name: 'is_open',
    label: '启用标识',
    id: uuidv1()
  },
  {
    name: 'rule_type',
    label: '规则类型',
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '最后修改时间',
    id: uuidv1()
  }
]

// 弹框表单配置
export const config = () => {
  return {
    rule_no: {
      component: 'input',
      label: '序号',
      colSpan: 12,
      name: 'rule_no',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        disabled: true,
        placeholder: '后台生成'
      }
    },
    organ_no: {
      component: 'select-tree',
      label: '机构号',
      colSpan: 12,
      name: 'organ_no',
      config: {
        rules: [{ required: true, message: '此处为必输' }]
      },
      componentProps: {
        clearable: true,
        disabled: false
      },
      options: []
    },
    rule_type: {
      component: 'select',
      label: '规则类型',
      colSpan: 12,
      name: 'rule_type',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        disabled: true
      },
      options: dictionaryFieds('AM_ANNUAL_TYPE')
    },
    is_open: {
      component: 'select',
      label: '启用标识',
      colSpan: 12,
      name: 'is_open',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        disabled: false
      },
      options: dictionaryFieds('CM1000', true)
    },
    prio_level: {
      component: 'input',
      label: '权重',
      colSpan: 12,
      name: 'prio_level',
      config: {
        rules: [{ required: true, message: '此处为必输' }]
      },
      componentProps: {
        clearable: true
      }
    },
    last_modi_date: {
      component: 'input',
      label: '年检年度',
      colSpan: 12,
      name: 'last_modi_date',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        disabled: true
      }
    },
    rule_desc: {
      component: 'input',
      label: '规则描述',
      colSpan: 24,
      name: 'rule_desc',
      config: {
        rules: [{ required: true, message: '此处为必输' }]
      },
      componentProps: {
        clearable: true,
        disabled: false,
        type: 'textarea'
      }
    }
  }
}
