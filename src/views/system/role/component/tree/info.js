import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表头
export const configTable = (that) => [
  {
    name: 'role_no',
    label: '角色号',
    id: uuidv1()
  },
  {
    name: 'role_name',
    label: '角色名称',
    id: uuidv1()
  },
  {
    name: 'role_organ_level',
    label: '角色机构',
    id: uuidv1()
  },
  {
    name: 'role_level',
    label: '角色等级',
    id: uuidv1()
  },
  {
    name: 'role_des',
    label: '角色描述',
    id: uuidv1()
  },
  {
    name: 'role_mode',
    label: '角色类别',
    id: uuidv1()
  },
  {
    name: 'is_open',
    label: '启用标志',
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '最后修改时间',
    id: uuidv1()
  }
]

// 表单
export const config = (that) => ({
  role_organ_level: {
    component: 'select',
    label: '角色机构',
    colSpan: 8,
    name: 'role_organ_level',
    config: {
      rules: [
        { required: true, message: '用户级别为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('ORGAN_LEVEL')
  },
  role_level: {
    component: 'input',
    label: '角色等级',
    colSpan: 8,
    name: 'role_level',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '不能为空' }]
    },
    componentProps: {
      // input组件配置
    }
  },
  role_no: {
    component: 'input',
    label: '角色号',
    colSpan: 8,
    name: 'role_no',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '不能为空' }]
    },
    componentProps: {
      // input组件配置
    }
  },
  role_name: {
    component: 'input',
    label: '角色名称',
    colSpan: 8,
    name: 'role_name',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '不能为空' }]
    },
    componentProps: {
      // input组件配置
    }
  },
  role_mode: {
    component: 'select',
    label: '角色类别',
    colSpan: 8,
    name: 'role_mode',
    config: {
      rules: [
        { required: true, message: '用户级别为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('ROLE_MODE')
  },
  is_open: {
    component: 'select',
    label: '启用标志',
    colSpan: 8,
    name: 'is_open',
    config: {
      rules: [
        { required: true, message: '用户级别为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('IS_OPEN')
  }
})
