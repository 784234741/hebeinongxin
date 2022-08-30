import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary'
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 55,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '机构号',
    width: 260,
    id: uuidv1()
  },
  {
    name: 'report_way',
    label: '机构报备方式',
    id: uuidv1()
  },
  {
    name: 'bank_code',
    label: '银行代码',
    id: uuidv1()
  },
  {
    name: 'per_report',
    label: '个人跑批报备',
    id: uuidv1()
  },
  {
    name: 'organ_report',
    label: '报备机构',
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that) => {
  return {
    organ_no: {
      component: 'input',
      label: '机构号',
      colSpan: 12,
      name: 'organ_no',
      config: {
        // form-item 配置
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        // input组件配置
        filterable: true,
        clearable: true,
        disabled: false
      }
    },
    report_way: {
      component: 'select',
      label: '机构报备方式',
      colSpan: 12,
      name: 'report_way',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true,
        clearable: true
      },
      options: dictionaryFieds('REPORTWAY')
    },
    bank_code: {
      component: 'input',
      label: '银行代码',
      colSpan: 12,
      name: 'bank_code',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true,
        clearable: true
      }
    },
    per_report: {
      component: 'select',
      label: '个人批量报备',
      colSpan: 12,
      name: 'per_report',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true,
        clearable: true
      },
      options: dictionaryFieds('PER_REPORT')
    },
    organ_report: {
      component: 'select-tree',
      label: '报备机构',
      colSpan: 12,
      name: 'organ_report',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        // input组件配置
        clearable: true,
        filterable: true
      },
      options: []
    }
  }
}
