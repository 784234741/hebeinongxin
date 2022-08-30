import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'date',
    label: '日期',
    width: 180,
    id: uuidv1()
  }, {
    name: 'name',
    label: '名称',
    width: 180,
    id: uuidv1()
  }, {
    name: 'address',
    label: '地址',
    id: uuidv1()
  }, {
    name: 'operate',
    label: '操作',
    id: uuidv1()
  }
]

// 表单
export const config = (that) => [
  {
    component: 'input',
    label: '用户名',
    colSpan: 8,
    name: 'name',
    config: { // form-item 配置
      rules: [
        { required: true, message: '不能为空' }
      ]
    },
    componentProps: { // input组件配置
    }
  },
  {
    component: 'radio',
    label: '用户名',
    colSpan: 8,
    name: 'userRadio',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      change: (data, value) => {
      }
    },
    options: [
      { label: '1', text: '选项1' },
      { label: '2', text: '选项2' }
    ]
  },
  {
    component: 'number',
    label: '用户名',
    colSpan: 8,
    name: 'usernumber',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      change: (data, value) => {
      }
    }
  }
]
