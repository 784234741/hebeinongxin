// 表单
export const config = (that, Config) => {
  return [
    {
      component: 'input',
      label: '父节点',
      colSpan: 12,
      name: 'parentField',
      config: {
        // form-item 配置
      },

      componentProps: {
        disabled: Config.disableConfig.PARENT_FIELD
      }
    },
    {
      component: 'input',
      label: '字典号',
      colSpan: 12,
      name: 'fieldId',
      config: {
        // form-item 配置
        rules: [
          { min: 2, max: 2, message: '请输入两位字典号！', trigger: 'change' }
        ]
      },
      componentProps: {
        disabled: Config.disableConfig.FIELD_NO,
        placehodler: Config.disableConfig.FIELD_NO ? '后台生成' : ''
        // maxlength: 2
      }
    },
    {
      component: 'input',
      label: '字典码',
      colSpan: 12,
      name: 'fieldNo',
      config: {
        // form-item 配置
      },
      componentProps: {
        disabled: Config.disableConfig.else
      }
    },
    {
      component: 'input',
      label: '字典类型',
      colSpan: 12,
      name: 'fieldType',
      config: {
        // form-item 配置
        rules: [
          { min: 2, max: 2, message: '请输入两位字符！', trigger: 'change' }
        ]
      },
      componentProps: {
        disabled: Config.disableConfig.else
      }
    },
    {
      component: 'input',
      label: '字典名',
      colSpan: 12,
      name: 'fieldName',
      config: {
        // form-item 配置
      },
      componentProps: {
        disabled: Config.disableConfig.else
      }
    },
    {
      component: 'number',
      label: '保留位',
      colSpan: 12,
      name: 'fieldSize',
      config: {
        // form-item 配置
      },
      componentProps: {
        // input组件配置
        change: (data, value) => {},
        disabled: Config.disableConfig.else
      }
    },
    {
      component: 'select',
      label: '字段类型',
      colSpan: 12,
      name: 'fieldMode',
      config: {},
      componentProps: {
        placehodler: '请选择',
        filterable: true,
        change: (value) => {
          // that.changeD(value)
          // console.log('param1212:', value)
        },
        filterMethod: (value) => {
          // console.log('3333：', value)
        },
        disabled: Config.disableConfig.else
      },
      options: [
        {
          value: 'varchar',
          label: 'varchar'
        },
        {
          value: 'number',
          label: 'number'
        },
        {
          value: 'char',
          label: 'char'
        },
        {
          value: 'int',
          label: 'int'
        },
        {
          value: 'timestamp',
          label: 'timestamp'
        }
      ]
    },
    {
      component: 'number',
      label: '字段长度',
      colSpan: 12,
      name: 'fieldLength',
      config: {
        // form-item 配置
      },
      componentProps: {
        // input组件配置
        change: (data, value) => {},
        disabled: Config.disableConfig.else
      }
    },
    {
      component: 'input',
      label: '最后修改日期',
      colSpan: 12,
      name: 'lastModiDate',
      config: {
        // form-item 配置
      },
      componentProps: {
        disabled: true
      }
    },
    {
      component: 'input',
      label: '字典描述',
      colSpan: 12,
      name: 'fieldDesc',
      config: {
        // form-item 配置
      },
      componentProps: {
        // input组件配置
        change: (data, value) => {},
        disabled: Config.disableConfig.else
      }
    }
  ]
}
