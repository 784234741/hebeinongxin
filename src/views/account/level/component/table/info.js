import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'acc_no',
    label: '账号',
    width: 150,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    width: 200,
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'cus_no',
    label: '客户号',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'cus_name',
    label: '客户名称',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    width: 150,
    id: uuidv1()
  },
  {
    name: 'this_level',
    label: '风险等级',
    width: 80,
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '最后评级时间',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'detail',
    label: '原因',
    id: uuidv1()
  }
]

// 表头
export const configTable2 = (that) => [
  {
    name: 'acc_no',
    label: '账号',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '机构',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'risk_type',
    label: '风险原因',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'risk_level',
    label: '风险等级',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'reason',
    label: '备注',
    width: 200,
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '风险时间',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'is_review',
    label: '待复核',
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
    config: { // form-item 配置
      rules: [
        { required: true, message: '账号为必输' },
        { pattern: /^[^!w|!.|!\\]+$/, message: '不允许输入特殊字符' }
      ]
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true
    }
  },
  risk_type: {
    component: 'select',
    label: '风险原因',
    colSpan: 22,
    name: 'risk_type',
    config: {
      rules: [
        { required: true, message: '风险类型为必输' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: [
      { value: '104', label: '双异地客户' },
      { value: '105', label: '无固定经营场所' },
      { value: '106', label: '简易开户且开通非柜面交易' },
      { value: '107', label: '企业信息变更30日内未办理变更手续' },
      { value: '110', label: '征信异常账户' },
      { value: '111', label: '其他(低风险)' },
      { value: '202', label: '空头公司账户' },
      { value: '203', label: '涉赌、涉诈但未涉案账户' },
      { value: '205', label: '未完成年检但存在未结清账款' },
      { value: '206', label: '开户6个月内无交易' },
      { value: '207', label: '其他(中风险)' },
      { value: '301', label: '已注销或失联企业账户' },
      { value: '302', label: '经营异常' },
      { value: '303', label: '违法失信' },
      { value: '305', label: '涉赌、涉诈账户' },
      { value: '306', label: '假冒他人身份或虚构代理关系' },
      { value: '308', label: '企业名称、法定代表人变更30日内未更新' },
      { value: '309', label: '其他(高风险)' }
    ],
    methods: {
      change(val) {
        if (val === '111' || val === '207' || val === '309') {
          that.dialog2.config.reason.hidden = false
        } else {
          that.dialog2.config.reason.hidden = true
        }
      }
    }
  },
  reason: {
    component: 'input',
    label: '备注',
    colSpan: 22,
    name: 'reason',
    hidden: 'true',
    componentProps: {
      clearable: true
    }
  }
})
