import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'cus_organ',
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'auth_phone',
    label: '认证手机号',
    id: uuidv1()
  },
  {
    name: 'cus_count',
    label: '使用客户数量',
    id: uuidv1()
  },

  {
    name: 'detail',
    label: '详情',
    id: uuidv1()
  }
]

// 表头
export const configTable2 = (that) => [
  {
    name: 'cus_organ',
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'cus_no',
    label: '客户号',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '客户名称',
    width: 240,
    id: uuidv1()
  },
  {
    name: 'auth_phone',
    label: '认证手机号',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'warn_status',
    label: '核实状态',
    width: 100,
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that) => ({
  acc_no: {
    component: 'select-tree',
    label: '机构号',
    colSpan: 12,
    name: 'organ_no',
    config: {
      // form-item 配置
      rules: [
        { required: true, message: '用户号为必输' },
        { pattern: /^[^!w|!.|!\\]+$/, message: '不允许输入特殊字符' }
      ]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true
    },
    options: that.$store.getters.organTree
  },
  create_year: {
    component: 'date-picker',
    label: '考核年份',
    colSpan: 12,
    name: 'create_year',
    config: {
      // form-item 配置
      rules: []
    },
    componentProps: {
      type: 'year'
    }
  }
})
