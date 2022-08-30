import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'sys_type',
    label: '用户系统',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'user_no',
    label: '用户号',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'user_type',
    label: '用户类型',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'user_level',
    label: '用户级别',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'verificat_result',
    label: '验证结果',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'is_used',
    label: '使用状态',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'is_open',
    label: '启用标志',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '最后修改时间',
    width: 120,
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '所属机构',
    colSpan: 12,
    name: 'organ_no',
    config: {
      rules: [{ required: true, message: '所属机构为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    },
    options: []
  },
  sys_type: {
    component: 'select',
    label: '用户系统',
    colSpan: 12,
    name: 'sys_type',
    config: {
      rules: [{ required: true, message: '用户系统为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    },
    methods: {
      change(val) {
        if (val === '0') {
          that.dialog.formData.user_level = ''
          that.dialog.config.user_level.hidden = false
          that.dialog.formData.user_type = ''
          that.dialog.config.user_type.hidden = false
        } else {
          that.dialog.formData.user_level = '0'
          that.dialog.config.user_level.hidden = true
          that.dialog.formData.user_type = '0'
          that.dialog.config.user_type.hidden = true
        }
      }
    },
    options: dictionaryFieds('REPORT_SYS_TYPE')
  },
  user_level: {
    component: 'select',
    label: '用户级别',
    colSpan: 12,
    name: 'user_level',
    hidden: false,
    config: {
      rules: [{ required: true, message: '用户级别为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    },
    methods: {
      change(val) {
        if (val === '4') {
          that.dialog.formData.user_type = ''
          that.dialog.config.user_type.hidden = false
        } else {
          that.dialog.formData.user_type = '0'
          that.dialog.config.user_type.hidden = true
        }
      }
    },
    options: dictionaryFieds('AM_REPORTUSER_LEVEL')
  },
  user_type: {
    component: 'select',
    label: '用户类型',
    colSpan: 12,
    name: 'user_type',
    hidden: false,
    config: {
      rules: [{ required: true, message: '用户类型为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    },
    options: dictionaryFieds('REPORT_USER_TYPE')
  },
  user_no: {
    component: 'input',
    label: '用户名',
    colSpan: 12,
    name: 'user_no',
    config: {
      rules: [{ required: true, message: '用户号为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    }
  },
  password: {
    component: 'input',
    label: '密码',
    colSpan: 12,
    name: 'password',
    config: {
      rules: [
        { required: true, message: '密码为必输', trigger: 'blur' },
        { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
      ]
    },
    componentProps: {
      clearable: true,
      showPassword: true
    }
  },
  password2: {
    component: 'input',
    label: '确认密码',
    colSpan: 12,
    name: 'password2',
    config: {
      rules: [
        { required: true, message: '确认密码为必输', trigger: 'blur' },
        { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' },
        {
          validator: function(rule, value, callback) {
            if (value !== that.dialog.formData.password) {
              callback(new Error('密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    },
    componentProps: {
      clearable: true,
      showPassword: true
    }
  },
  is_open: {
    component: 'select',
    label: '启用标志',
    colSpan: 12,
    name: 'is_open',
    config: {
      rules: [{ required: true, message: '启用标志为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    },
    options: dictionaryFieds('IS_OPEN')
  }
})

// 查看密码弹出框表单
export const configPsd = (that) => ({
  organ_no: {
    component: 'input',
    label: '所属机构',
    colSpan: 12,
    name: 'organ_no',
    config: {},
    componentProps: {
      disabled: true
    }
  },
  user_no: {
    component: 'input',
    label: '用户号',
    colSpan: 12,
    name: 'user_no',
    config: {
      rules: [{ required: true, message: '用户号为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true
    }
  },
  password: {
    component: 'input',
    label: '密码',
    colSpan: 12,
    name: 'password',
    config: {
      rules: [{ required: true, message: '密码为必输', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true,
      showPassword: true
    }
  },
  auth_type: {
    component: 'select',
    label: '授权类型',
    colSpan: 12,
    name: 'auth_type',
    config: {},
    componentProps: {
      clearable: true
    },
    options: [{ label: '密码授权', value: '1' }]
  }
})
