import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'open_organ',
    label: '开户机构',
    id: uuidv1()
  },
  {
    name: 'open_date',
    label: '开户日期',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账户',
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'bank_acc_type',
    label: '核心账户类型',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'acc_state',
    label: '账户状态',
    width: 80,
    id: uuidv1()
  },
  {
    name: 'sync',
    label: '待补充',
    width: 80,
    id: uuidv1()
  }
]

// 表头
export const configTable3 = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'open_organ',
    label: '开户机构',
    width: 340,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账户',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'year_no',
    label: '年检年度',
    id: uuidv1()
  },
  {
    name: 'annual_state',
    label: '年检状态',
    id: uuidv1()
  },
  {
    name: 'annual_date',
    label: '年检日期',
    id: uuidv1()
  },

  {
    name: 'is_hand',
    label: '是否手工年检',
    id: uuidv1()
  },
  {
    name: 'confirm_state',
    label: '状态确认',
    id: uuidv1()
  },
  {
    name: 'confirm_date',
    label: '确认日期',
    id: uuidv1()
  },

  {
    name: 'is_hand',
    label: '是否手工年检',
    id: uuidv1()
  },
  {
    name: 'confirm_state',
    label: '状态确认',
    id: uuidv1()
  },
  {
    name: 'confirm_date',
    label: '确认日期',
    id: uuidv1()
  },
  {
    name: 'phone',
    label: '联系方式',
    id: uuidv1()
  }
]
// 表头
export const configTable5 = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账号',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    id: uuidv1()
  },
  {
    name: 'oper_type',
    label: '操作类型',
    id: uuidv1()
  },
  {
    name: 'trans_date',
    label: '交易日期',
    id: uuidv1()
  },

  {
    name: 'report_state',
    label: '报备状态',
    id: uuidv1()
  },
  {
    name: 'report_date',
    label: '报备日期',
    id: uuidv1()
  },
  {
    name: 'check_state',
    label: '核准状态',
    id: uuidv1()
  },

  {
    name: 'report_reason',
    label: '失败原因',
    id: uuidv1()
  },
  {
    name: 'sys_type',
    label: '系统类型',
    id: uuidv1()
  },
  {
    name: 'report_detail',
    label: '报备详情',
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that) => ({
  acc_no: {
    component: 'input',
    label: '账号',
    colSpan: 22,
    name: 'acc_no',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      disabled: true
    }
  },
  acc_type: {
    component: 'select',
    label: '账户类型',
    colSpan: 22,
    name: 'acc_type',
    config: {
      // form-item 配置
      rules: []
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true
    },
    options: dictionaryFieds('ACC_TYPE')
  }
})

export const config3 = (that) => {
  return {
    cus_type: {
      component: 'select',
      label: '客户类型',
      colSpan: 22,
      name: 'cus_type',
      config: {},
      componentProps: {},
      options: [
        { value: '2', label: '对公' },
        { value: '3', label: '同业' }
      ]
    },
    acc_no: {
      component: 'input',
      label: '账号',
      colSpan: 22,
      name: 'acc_no',
      config: {},
      componentProps: {},
      methods: {}
    },
    acc_type: {
      component: 'select',
      label: '账户类型',
      colSpan: 22,
      name: 'acc_type',
      config: {},
      componentProps: {},
      options: dictionaryFieds('ACC_TYPE'),
      methods: {
        change() {
          if (that.dialog3.formData.acc_type !== '1' && that.dialog3.formData.acc_type !== '4' && that.dialog3.formData.acc_type !== '5') {
            that.dialog3.config.depo_type.hidden = true
          } else {
            that.dialog3.config.depo_type.hidden = false
          }
        }
      }
    },
    depo_type: {
      component: 'select',
      label: '存款人类别',
      colSpan: 22,
      name: 'depo_type',
      hidden: false,
      config: {},
      componentProps: {},
      options: dictionaryFieds('DEPO_TYPE'),
      methods: {
        change() {
          if (that.dialog3.formData.acc_type === '5') {
            that.dialog3.config.depo_type.options = dictionaryFieds(
              'DEPO_TYPE'
            ).filter(
              (item) =>
                item.value === '50' ||
                item.value === '51' ||
                item.value === '52'
            )
          } else {
            that.dialog3.config.depo_type.options = dictionaryFieds('DEPO_TYPE')
          }
        }
      }
    }
  }
}
