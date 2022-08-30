import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表头
export const configTable = (that) => [
  {
    name: 'role_no',
    label: '角色号',
    id: uuidv1(),
    width: '70'
  },
  {
    name: 'role_name',
    label: '角色名称',
    id: uuidv1(),
    width: '150'
  },
  {
    name: 'role_organ_level',
    label: '角色机构',
    id: uuidv1(),
    width: '80'
  },
  {
    name: 'role_level',
    label: '角色等级',
    id: uuidv1(),
    width: '80'
  },
  {
    name: 'role_des',
    label: '角色描述',
    id: uuidv1(),
    width: '100'
  },
  {
    name: 'role_mode',
    label: '角色类别',
    id: uuidv1(),
    width: '80'
  },
  {
    name: 'is_open',
    label: '启用标志',
    id: uuidv1(),
    width: '80'
  },
  {
    name: 'last_modi_date',
    label: '最后修改时间',
    id: uuidv1(),
    width: '160'
  }
]

// 弹出框 新增、修改
export const config = (that) => ({
  organ_level: {
    component: 'select',
    label: '角色机构',
    colSpan: 22,
    name: 'organ_level',
    config: {
      rules: [
        { required: true, message: '角色机构为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      clearable: true
    },
    options: dictionaryFieds('ORGAN_LEVEL')
  },
  role_level: {
    component: 'input',
    label: '角色等级',
    colSpan: 22,
    name: 'role_level',
    config: {
      // form-item 配置
      rules: [
        { required: true, message: '角色等级为必输' },
        { pattern: /^[0-9]\d{1}$/, message: '请填写2个字符（数字）' }
      ]
    },
    componentProps: {
      clearable: true
      // input组件配置
    }
  },
  role_no: {
    component: 'input',
    label: '角色号',
    colSpan: 22,
    name: 'role_no',
    config: {
      // form-item 配置
      rules: [
        { required: true, message: '角色号为必输' },
        { min: 0, max: 4, message: '角色号只允许存在最多4个字符' },
        { pattern: /^[0-9]\d*$/, message: '只允许输入数字' }
      ]
    },
    componentProps: {
      clearable: true
      // input组件配置
    }
  },
  role_name: {
    component: 'input',
    label: '角色名称',
    colSpan: 22,
    name: 'role_name',
    config: {
      // form-item 配置
      rules: [
        { required: true, message: '角色号为必输' },
        { min: 0, max: 15, message: '角色号只允许存在0-15个字符' }
      ]
    },
    componentProps: {
      clearable: true
      // input组件配置
    }
  },
  role_mode: {
    component: 'select',
    label: '角色类别',
    colSpan: 22,
    name: 'role_mode',
    config: {
      rules: [
        { required: true, message: '角色类别为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      clearable: true
    },
    options: dictionaryFieds('ROLE_MODE')
  },
  is_open: {
    component: 'select',
    label: '启用标志',
    colSpan: 22,
    name: 'is_open',
    config: {
      rules: [
        { required: true, message: '启用标志为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      clearable: true
    },
    options: dictionaryFieds('IS_OPEN')
  },
  role_des: {
    component: 'input',
    label: '角色描述',
    colSpan: 22,
    name: 'role_des',
    config: {
      rules: [
        { min: 0, max: 50, message: '角色描述只允许存在0-50个字符' }
      ]
    },
    componentProps: {
      type: 'textarea',
      clearable: true
    }
  }
})
