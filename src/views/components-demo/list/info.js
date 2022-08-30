
// 表单
export const config = (that) => [
  {
    component: 'input',
    label: '用户名',
    colSpan: 8,
    name: 'userId',
    config: { // form-item 配置
      rules: [
        { required: true, message: '年龄不能为空' },
        { type: 'number', message: '年龄必须为数字值' }
      ]
    },
    componentProps: { // input组件配置
      type: 'age',
      placehodler: '1111',
      clearable: true,
      change: (data, value) => {
        // console.log('that:', that.defaultForm)
        // console.log('param33333:', data)
      },
      input: (data, value) => {
        // console.log('value:', value)
      }
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
    component: 'checkbox',
    label: '用户名',
    colSpan: 8,
    name: 'userCheckbox',
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
  },
  {
    component: 'select',
    label: '角色',
    colSpan: 8,
    name: 'region',
    config: {
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      change: (value) => {
        // that.changeD(value)
        // console.log('param2222:', value)
      },
      filterMethod: (value) => {
        // console.log('3333：', value)
      }
    },
    options: [
      { label: '区域一', value: '1' },
      { label: '区域二', value: '3' }
    ]
  },
  {
    component: 'switch',
    label: '角色',
    colSpan: 8,
    name: 'regionswitch',
    config: {
    },
    componentProps: {
      change: (data, value) => {
        that.changeD(value)
        console.log('param:', data)
      }
    }
  },
  {
    component: 'time-select',
    label: '角色',
    colSpan: 8,
    name: 'regiontime-select',
    config: {
    },
    componentProps: {
      change: (data, value) => {
        that.changeD(value)
        console.log('param:', data)
      }
    }
  },
  {
    component: 'upload',
    label: '角色',
    colSpan: 8,
    name: 'regiontime-upload',
    config: {
    },
    componentProps: {
      action: '',
      change: (data, value) => {
        that.changeD(value)
        console.log('param:', data)
      }
    }
  },
  {
    component: 'select-tree',
    label: '角色',
    colSpan: 8,
    name: 'regiontime-upload22',
    options: [{ id: 1,
      label: '北京市',
      childList: [{ id: 2, label: '朝阳区' }, { id: 3, label: '东城区' }]
    }, { id: 4,
      label: '黑龙江',
      childList: [{ id: 5, label: '哈尔滨' }, { id: 6, label: '佳木斯' }]
    }, { id: 7,
      label: '辽宁省',
      childList: [{ id: 8, label: '沈阳市' }, { id: 9, label: '大连市' }]
    }
    ]
  },
  {
    component: 'cascader',
    label: '用户名',
    colSpan: 8,
    name: 'usercascader',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      change: (data, value) => {
      }
    },
    options: [
      { value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }
    ]
  }
]
