import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表头
export const configTable = (that) => [
  {
    name: 'organ_no',
    label: '所属机构',
    id: uuidv1()
  }, {
    name: 'user_no',
    label: '用户号',
    width: 100,
    id: uuidv1()
  }, {
    name: 'role_no',
    label: '角色号',
    id: uuidv1(),
    width: 150
  }, {
    name: 'user_status',
    label: '用户状态',
    width: 80,
    id: uuidv1()
  }, {
    name: 'login_mode',
    label: '登录方式',
    width: 80,
    id: uuidv1()
  }, {
    name: 'login_state',
    label: '登录状态',
    width: 80,
    id: uuidv1()
  }, {
    name: 'last_modi_date',
    label: '最后修改时间',
    width: 160,
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '所属机构',
    colSpan: 8,
    name: 'organ_no',
    config: { // form-item 配置
      rules: [
        { required: true, message: '所属机构为必输' }
      ]
    },
    componentProps: { // input组件配置
      clearable: true,
      disabled: false
    },
    options: []
  },
  user_no: {
    component: 'input',
    label: '用户号',
    colSpan: 8,
    name: 'user_no',
    config: { // form-item 配置
      rules: [
        { required: true, message: '用户号为必输' },
        { pattern: /^[^!w|!.|!\\]+$/, message: '不允许输入特殊字符' }
      ]
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true,
      disabled: false
    }
  },
  tellerlvl: {
    component: 'select',
    label: '用户级别',
    colSpan: 8,
    name: 'tellerlvl',
    config: {
      rules: [
        { required: true, message: '用户级别为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      disabled: false
    },
    options: dictionaryFieds('USER_LEVEL'),
    methods: {
      change(val) {
        let copyData = JSON.parse(JSON.stringify(that.rolelist))
        if (val === '1') {
          that.dialog.config.role_no.options = copyData
        } else if (val === '2') {
          copyData[0].children = copyData[0].children.filter(item => item.id !== '11')
          that.dialog.config.role_no.options = copyData
        } else if (val === '3') {
          copyData[0].children = copyData[0].children.filter(item => item.id !== '11' && item.id !== '22')
          that.dialog.config.role_no.options = copyData
        } else {
          copyData[0].children = copyData[0].children.filter(item => item.id === '44')
          that.dialog.config.role_no.options = copyData
        }
      }
    }
  },
  user_name: {
    component: 'input',
    label: '用户名称',
    colSpan: 8,
    name: 'user_name',
    config: { // form-item 配置
      rules: [
        { required: true, message: '用户名称为必输' },
        { min: 0, max: 25, message: '长度在 3 到 5 个字符' }
      ]
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true
    }
  },
  right_organ_no: {
    component: 'select-tree',
    label: '权限机构',
    colSpan: 8,
    name: 'right_organ_no',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      clearable: true,
      disabled: true
    },
    options: []
  },
  role_no: {
    component: 'select-tree',
    label: '角色号',
    colSpan: 8,
    name: 'role_no',
    config: { // form-item 配置
      rules: [
        { required: true, message: '所属机构为必输' }
      ]
    },
    componentProps: { // input组件配置
      clearable: true,
      disabled: false,
    },
    options: []
  },
  user_status: {
    component: 'select',
    label: '用户状态',
    colSpan: 8,
    name: 'user_status',
    config: {
      rules: [
        { required: true, message: '用户状态为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      disabled: true
    },
    options: dictionaryFieds('USER_STATE')
  },
  login_mode: {
    component: 'select',
    label: '登录方式',
    colSpan: 8,
    name: 'login_mode',
    config: {
      rules: [
        { required: true, message: '登录方式为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('USER_LOGIN_TYPE')
  },
  login_state: {
    component: 'select',
    label: '登录状态',
    colSpan: 8,
    name: 'login_state',
    config: {
      rules: [
        { required: true, message: '登录状态为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      disabled: true
    },
    options: dictionaryFieds('USER_LOGIN_STATE')
  },
  single_login: {
    component: 'select',
    label: '单点登录',
    colSpan: 8,
    name: 'single_login',
    config: {
      rules: [
        { required: true, message: '单点登录为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('IS_OPEN')
  },
  last_login_time: {
    component: 'input',
    label: '最后登录时间',
    colSpan: 8,
    name: 'last_login_time',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true,
      disabled: true
    }
  },
  last_logout_time: {
    component: 'input',
    label: '最后登出时间',
    colSpan: 8,
    name: 'last_logout_time',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true,
      disabled: true
    }
  }
})

// 批量配置弹出框表单
export const configBatch = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '所属机构',
    colSpan: 22,
    name: 'organ_no',
    config: { // form-item 配置
      rules: [
        { required: true, message: '所属机构为必输' }
      ]
    },
    componentProps: { // input组件配置
      clearable: true
    },
    options: []
  },
  user_status: {
    component: 'select',
    label: '用户状态',
    colSpan: 22,
    name: 'user_status',
    config: {
      rules: [
        { required: true, message: '用户状态为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('USER_STATE')
  },
  is_change_children: {
    component: 'select',
    label: '是否联动下级',
    colSpan: 22,
    name: 'is_change_children',
    config: {
      rules: [
        { required: true, message: '是否联动下级为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('IS_CHANGE_CHILDREN')
  }
})
