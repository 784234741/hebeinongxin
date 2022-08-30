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
    name: 'year_no',
    label: '年份',
    id: uuidv1()
  },
  {
    name: 'start_date',
    label: '年检开始日期',
    id: uuidv1()
  },
  {
    name: 'end_date',
    label: '年检结束日期',
    id: uuidv1()
  },
  {
    name: 'is_open',
    label: '启用标识',
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
    year_no: {
      component: 'select',
      label: '年检年度',
      colSpan: 24,
      name: 'year_no',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true,
        disabled: false
      },
      options: [
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' }
      ]
    },
    is_open: {
      component: 'select',
      label: '启用标识',
      colSpan: 24,
      name: 'is_open',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('CM1000', true)
    },
    annual_time: {
      component: 'date-picker',
      label: '年检时间',
      colSpan: 24,
      name: 'annual_time',
      componentProps: {
        filterable: true,
        type: 'daterange',
        clearable: true,
        startPlaceholder: '年检开始日期',
        endPlaceholder: '年检结束日期',
        valueFormat: 'yyyyMMdd'
      }
    }
  }
}
