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
    name: 'organ_name',
    label: '机构名称',
    width: 260,
    id: uuidv1()
  },
  {
    name: 'organ_type',
    label: '机构类型',
    id: uuidv1()
  },
  {
    name: 'organ_level',
    label: '机构级别',
    id: uuidv1()
  },
  {
    name: 'status',
    label: '机构状态',
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
    name: 'parent_organ',
    label: '上级机构',
    width: 260,
    id: uuidv1()
  },
  {
    name: 'organ_phone',
    label: '机构电话',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'address',
    label: '机构地址',
    width: 260,
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
        clearable: true
      }
    },
    organ_name: {
      component: 'input',
      label: '机构名称',
      colSpan: 12,
      name: 'organ_name',
      config: {
        // form-item 配置
        rules: [
          { required: true, message: '此处不能为空' }
        ]
      },
      componentProps: {
        // input组件配置
        placehodler: '',
        clearable: true
      }
    },

    parent_organ: {
      component: 'select-tree',
      label: '上级机构',
      colSpan: 12,
      name: 'parent_organ',
      config: {
        // form-item 配置
        rules: [
          { required: true, message: '此处不能为空' },
          { min: 0, max: 25, message: '长度在 3 到 5 个字符' }
        ]
      },
      componentProps: {
        // input组件配置
        placehodler: '',
        clearable: true
      },
      options: that.$store.getters.organTree
    },

    organ_type: {
      component: 'select',
      label: '机构类型',
      colSpan: 12,
      name: 'organ_type',
      config: {
        // form-item 配置
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        // input组件配置
        placehodler: '',
        clearable: true
      },
      options: dictionaryFieds('ORGAN_TYPE')
    },
    organ_level: {
      component: 'select',
      label: '机构级别',
      colSpan: 12,
      name: 'organ_level',
      config: {
        // form-item 配置
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        // input组件配置
        placehodler: '',
        clearable: true
      },
      options: dictionaryFieds('ORGAN_LEVEL').map((item) => {
        item.value = parseInt(item.value)
        return item
      })
    },
    status: {
      component: 'select',
      label: '机构状态',
      colSpan: 12,
      name: 'status',
      config: {
        // form-item 配置
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        // input组件配置
        placehodler: '',
        clearable: true
      },
      options: dictionaryFieds('ORGAN_STATUS')
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
        filterable: true
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
        filterable: true
      }
    },
    city_name: {
      component: 'input',
      label: '所属市',
      colSpan: 12,
      name: 'city_name',
      config: {
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true
      }
    },
    area_name: {
      component: 'input',
      label: '所属区',
      colSpan: 12,
      name: 'area_name',
      config: {
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true
      }
    },
    organ_phone: {
      component: 'input',
      label: '机构电话',
      colSpan: 12,
      name: 'organ_phone',
      config: {
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true
      }
    },
    address: {
      component: 'input',
      label: '机构地址',
      colSpan: 12,
      name: 'address',
      config: {
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true
      }
    },
    jindu: {
      component: 'input',
      label: '经度',
      colSpan: 12,
      name: 'jindu',
      config: {
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true,
        disabled: true
      }
    },
    weidu: {
      component: 'input',
      label: '纬度',
      colSpan: 12,
      name: 'weidu',
      config: {
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true,
        disabled: true
      }
    },
    per_report: {
      component: 'select',
      label: '个人批量报备',
      colSpan: 12,
      name: 'per_report',
      config: {
      },
      componentProps: {
        placehodler: '请选择',
        filterable: true
      },
      options: dictionaryFieds('PER_REPORT')
    }
  }
}
