import { v1 as uuidv1 } from 'uuid'
import { btnDatas, getDataValue } from '@/utils/dictionary' // 字典配置
// 表头
export const configTable = (that) => [
  {
    name: 'buttonId',
    label: '按钮标识',
    id: uuidv1()
  }, {
    name: 'buttonName',
    label: '按钮名称',
    id: uuidv1()
  }
]

// 表单
export const config = (that) => ({
  btn_sys: {
    component: 'select',
    label: '按钮选择',
    colSpan: 20,
    name: 'btn_sys',
    config: { // form-item 配置
      rules: [
        { required: true, message: '菜单名称为必选' }
      ]
    },
    componentProps: { // 属性名
      placehodler: '请选择',
      filterable: true
    },
    methods: { // 方法名
      change: (value) => {
        that.listAdd = getDataValue(btnDatas, value)
      }
    },
    options: btnDatas
  }
})
