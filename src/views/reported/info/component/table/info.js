import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账号',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户类型',
    width: 120,
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
// 新增弹出框表单
export const config = (that) => {
  return {
    oper_type: {
      component: 'select',
      label: '操作类型',
      colSpan: 18,
      name: 'oper_type',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('HANDLE_TYPE'),
      methods: {
        change(val) {
          const { is_change, depo_type } = that.dialog2.config
          if (val === '1') {
            is_change.hidden = false
            depo_type.hidden = false
            is_change.config.rules[0].required = true
            depo_type.config.rules[0].required = true
          } else if (val === '3') {
            depo_type.hidden = true
            is_change.hidden = true
            depo_type.config.rules[0].required = false
            is_change.config.rules[0].required = false
            that.disabledInput(that.dialog2.formData)
          } else {
            depo_type.hidden = false
            is_change.hidden = true
            depo_type.config.rules[0].required = true
            is_change.config.rules[0].required = false
            that.disabledInput(that.dialog2.formData)
          }
        }
      }
    },
    cus_type: {
      component: 'select',
      label: '客户类型',
      colSpan: 18,
      name: 'cus_type',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        clearable: true
      },
      options: [
        { value: '2', label: '对公' },
        { value: '3', label: '同业' }
      ]
    },
    acc_no: {
      component: 'input',
      label: '账号',
      colSpan: 18,
      name: 'acc_no',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        clearable: true
      },
      methods: {
        change(val) {
          that.disabledInput(that.dialog2.formData)
        }
      }
    },
    acc_type: {
      component: 'select',
      label: '账户类型',
      colSpan: 18,
      name: 'acc_type',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        clearable: true,
        disabled: false
      },
      options: dictionaryFieds('ACC_TYPE'),
      methods: {
        change() {
          if (that.dialog2.formData.acc_type === '5') {
            that.dialog2.config.depo_type.options = dictionaryFieds(
              'DEPO_TYPE'
            ).filter(
              (item) =>
                item.value === '50' ||
                item.value === '51' ||
                item.value === '52'
            )
          } else {
            that.dialog2.config.depo_type.options = dictionaryFieds('DEPO_TYPE')
          }
          that.isVisible(that.dialog2.formData.acc_type)
        }
      }
    },
    depo_type: {
      component: 'select',
      label: '存款人类别',
      colSpan: 18,
      name: 'depo_type',
      hidden: false,
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        clearable: true,
        disabled: false
      },
      options: dictionaryFieds('DEPO_TYPE'),
      methods: {}
    },
    is_change: {
      component: 'select',
      hidden: true,
      label: '是否转户',
      colSpan: 18,
      name: 'is_change',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        clearable: true
      },
      options: [
        { value: '0', label: '是' },
        { value: '1', label: '否' }
      ]
    },
    change_vailddate: {
      component: 'select',
      hidden: true,
      label: '变更展期',
      colSpan: 18,
      name: 'change_vailddate',
      config: {
        rules: [{ required: true, message: '此处不能为空' }]
      },
      componentProps: {
        clearable: true,
        disabled: false
      },
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '2' }
      ]
    }
  }
}
// 表头
export const configTable2 = (that) => [
  {
    name: 'check_item',
    label: '考核项目',
    width: 140,
    id: uuidv1()
  },
  {
    name: 'check_content',
    label: '考核内容',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'check_require',
    label: '考核要求',
    width: 320,
    id: uuidv1()
  },
  {
    name: 'item_score',
    label: '分值',
    width: 60,
    id: uuidv1()
  },
  {
    name: 'check_standard',
    label: '加减分标准',
    width: 320,
    id: uuidv1()
  },
  {
    name: 'check_score',
    label: '得分',
    id: uuidv1()
  },
  {
    name: 'score_reason',
    label: '扣分原因',
    id: uuidv1()
  }
]
export const configData = (that) => {
  return {
    // 账户信息详情
    information: {
      title: '账户信息详情',
      width: '98%',
      top: '5vh',
      visible: false,
      column: 3,
      data: [
        {
          title: '账户信息',
          arr: [
            { label: '账号', name: 'acc_no' },
            { label: '账户名称', name: 'acc_name' },
            { label: '开户日期', name: 'open_date' },
            { label: '开户机构', name: 'open_organ' },
            { label: '账户类型', name: 'acc_type' },
            { label: '账户状态', name: 'acc_state' },
            { label: '币种种类', name: 'cur_array' },
            { label: '久悬标识', name: 'susp_state' },
            { label: '销户日期', name: 'close_date' },
            { label: '到期日期', name: 'expire_date' }
          ]
        },
        {
          title: '客户信息',
          arr: [
            { label: '开户许可证核准号', name: 'license_no' },
            { label: '统一社会信用代码', name: 'ent_credit_no' },
            { label: '客户名称', name: 'cus_name' },
            { label: '客户类型', name: 'cus_type' },
            { label: '注册资本', name: 'reg_money' },
            { label: '成立日期', name: 'start_date' },
            { label: '注销日期', name: 'end_date' },
            { label: '注册地址', name: 'reg_adr' },
            { label: '经营范围', name: 'reg_scope' },
            { label: '人行行业类型', name: 'hd_type' },
            { label: '存款人类别', name: 'depo_type' },
            { label: '地区代码', name: 'adr_id' },
            { label: '邮政编码', name: 'zcode' },
            { label: '法人', name: 'legal_name' },
            { label: '法人证件号', name: 'legal_id' },
            { label: '法人联系电话', name: 'legal_phone' },
            { label: '法人证件到期日', name: 'legal_end' },
            { label: '经办人', name: 'agent_name' },
            { label: '经办人证件号', name: 'agent_id' },
            { label: '经办人联系电话', name: 'agent_phone' },
            { label: '经办人证件到期日', name: 'agent_end' },
            { label: '组织机构代码', name: 'org_no' }
          ]
        }
      ]
    },
    // 1-基本类型
    basic_type: {
      width: '98%',
      top: '5vh',
      visible: false,
      column: 3,
      data: [
        {
          title: '账户信息',
          arr: [
            { label: '账号', name: 'accno' },
            { label: '开户日期', name: 'begindate' },
            { label: '原基本存款账户编号', name: 'saccbaselicno' },
            { label: '币种类型', name: 'scurtype' },
            { label: '币种种类', name: 'cruArray' }
          ]
        },
        {
          title: '客户信息',
          arr: [
            { label: '存款人名称', name: 'sdepname' },
            { label: '行业归属', name: 'trade_type1' },
            { label: '关联企业', name: 'entList' },
            { label: '电话', name: 'sdeptel' },
            { label: '地址', name: 'sdepaddress' },
            { label: '邮政编码', name: 'sdeppostcode' },
            { label: '存款人类别', name: 'sdepkind' },
            { label: '工商营业执照有效期', name: 'deffectdate' },
            { label: '组织机构代码', name: 'sdeporgcode' },
            { label: '法定代表人/单位负责人', name: 'idepmanagestype' },
            { label: '姓名', name: 'sdepmanagername' },
            { label: '身份证件种类', name: 'sdepmancrekind' },
            { label: '身份证件号码', name: 'sdepmancrecode' },
            { label: '国家或地区', name: 'sDepManRegion' },
            { label: '注册资金币种', name: 'sdepfundkind' },
            { label: '注册资金(元)', name: 'fdepfund' },
            { label: '证明文件1种类', name: 'saccfiletype1' },
            { label: '证明文件1编号', name: 'saccfilecode1' },
            { label: '证明文件2种类', name: 'saccfiletype2' },
            { label: '证明文件2编号', name: 'saccfilecode2' },
            { label: '国税登记证号', name: 'sdepcountaxcode' },
            { label: '地税登记证号', name: 'sdepareataxcode' },
            {
              label: '无需办理税务登记证的文件或税务机关出具的证明',
              name: 'sdepnotaxfile'
            },
            { label: '备注', name: 'sremark' },
            { label: '经营范围', name: 'sdepwork' }
          ]
        },
        {
          title: '上级法人或主管单位信息',
          arr: [
            { label: '单位名称', name: 'sdeptname' },
            { label: '基本户开户许可证核准号', name: 'sdeptlic' },
            { label: '组织机构代码', name: 'sdeptmanorgcode' },
            { label: '法定代表人/单位负责人', name: 'sdeptmankind' },
            { label: '姓名', name: 'sdeptmanname' },
            { label: '身份证件种类', name: 'sdeptmancrekind' },
            { label: '身份证件号码', name: 'sdeptmancrecode' }
          ]
        }
      ]
    },
    // 2-预算单位
    budget_com: {
      width: '98%',
      top: '5vh',
      visible: false,
      column: 1,
      data: [
        {
          title: '账户基本信息',
          visible: false,
          arr: [
            { label: '基本户开户许可证核准号', name: 'licno' },
            { label: '基本户开户地地区代码', name: 'areacode' },
            { label: '账号', name: 'accno' },
            { label: '开户日期', name: 'begindate' },
            { label: '币种类型', name: 'scurtype' },
            { label: '币种种类', name: 'cruArray' },
            { label: '证明文件1种类', name: 'saccfiletype1' },
            { label: '证明文件1编号', name: 'saccfilecode1' },
            { label: '证明文件2种类', name: 'saccfiletype2' },
            { label: '证明文件2编号', name: 'saccfilecode2' },
            { label: '资金性质', name: 'saccfundkind' },
            { label: '账户名称构成方式', name: 'imode' }
          ]
        },
        {
          title: '资金管理人信息',
          visible: false,
          arr: [
            { label: '资金管理人姓名', name: 'saccdepname' },
            { label: '身份证件种类', name: 'saccdepcrekind' },
            { label: '身份证件编号', name: 'saccdepcrecode' }
          ]
        },
        {
          title: '内设部门信息',
          visible: false,
          arr: [
            { label: '内设部门名称', name: 'saccdepname' },
            { label: '负责人姓名', name: 'saccdepmanname' },
            { label: '身份证件种类', name: 'saccdepcrekind' },
            { label: '身份证件号码', name: 'saccdepcrecode' },
            { label: '电话', name: 'saccdeptel' },
            { label: '邮政编码', name: 'saccdeppostcode' },
            { label: '地址', name: 'saccdepaddress' }
          ]
        }
      ]
    },
    // 3-临时机构
    temporary_org: {
      width: '98%',
      top: '5vh',
      visible: false,
      column: 3,
      data: [
        {
          title: '账户信息',
          arr: [
            { label: '账号', name: 'accno' },
            { label: '开户日期', name: 'begindate' },
            { label: '币种类型', name: 'scurtype' },
            { label: '币种种类', name: 'cruArray' },
            { label: '有效日期', name: 'daccvailddate' }
          ]
        },
        {
          title: '客户信息',
          arr: [
            { label: '存款人名称', name: 'sdepname' },
            { label: '行业归属', name: 'trade_type1' },
            { label: '电话', name: 'sdeptel' },
            { label: '地址', name: 'sdepaddress' },
            { label: '邮政编码', name: 'sdeppostcode' },
            { label: '组织机构代码', name: 'sdeporgcode' },
            { label: '法定代表人/单位负责人', name: 'idepmanagestype' },
            { label: '姓名', name: 'sdepmanagername' },
            { label: '身份证件种类', name: 'sdepmancrekind' },
            { label: '身份证件号码', name: 'sdepmancrecode' },
            { label: '国家或地区', name: 'sDepManRegion' },
            { label: '注册资金币种', name: 'sdepfundkind' },
            { label: '注册资金(元)', name: 'fdepfund' },
            { label: '证明文件1种类', name: 'saccfiletype1' },
            { label: '证明文件1编号', name: 'saccfilecode1' },
            { label: '国税登记证号', name: 'sdepcountaxcode' },
            { label: '地税登记证号', name: 'sdepareataxcode' },
            {
              label: '无需办理税务登记证的文件或税务机关出具的证明',
              name: 'sdepnotaxfile'
            },
            { label: '经营范围', name: 'sdepwork' }
          ]
        },
        {
          title: '上级法人或主管单位信息',
          arr: [
            { label: '单位名称', name: 'sdeptname' },
            { label: '基本户开户许可证核准号', name: 'sdeptlic' },
            { label: '组织机构代码', name: 'sdeptmanorgcode' },
            { label: '法定代表人/单位负责人', name: 'sdeptmankind' },
            { label: '姓名', name: 'sdeptmanname' },
            { label: '身份证件种类', name: 'sdeptmancrekind' },
            { label: '身份证件号码', name: 'sdeptmancrecode' }
          ]
        }
      ]
    },
    // 4-非临时机构
    nontemporary_org: {
      width: '78%',
      top: '4vh',
      visible: false,
      column: 2,
      data: [
        {
          title: '账户信息',
          arr: [
            { label: '基本户开户许可证核准号', name: 'licno' },
            { label: '基本户开户地地区代码', name: 'areacode' },
            { label: '账号', name: 'saccno' },
            { label: '币种类型', name: 'scurtype' },
            { label: '币种种类', name: 'cruArray' },
            { label: '申请开户的原因', name: 'saccreason' },
            { label: '开户日期', name: 'begindate' },
            { label: '有效日期', name: 'daccvailddate' },
            { label: '证明文件种类', name: 'saccfiletype1' },
            { label: '证明文件号码', name: 'saccfilecode1' }
          ]
        },
        {
          title: '建筑施工及安装单位信息',
          visible: true,
          arr: [
            { label: '项目部名称', name: 'saccdepname' },
            { label: '负责人姓名', name: 'saccdepmanname' },
            { label: '身份证件种类', name: 'saccdepcrekind' },
            { label: '身份证件编号', name: 'saccdepcrecode' },
            { label: '电话', name: 'saccdeptel' },
            { label: '邮政编码', name: 'saccdeppostcode' },
            { label: '地址', name: 'saccdepaddress' }
          ]
        }
      ]
    },
    // 5-特殊单位
    special_com: {
      width: '98%',
      top: '5vh',
      visible: false,
      column: 3,
      data: [
        {
          title: '账户信息',
          arr: [
            { label: '账号', name: 'accno' },
            { label: '开户日期', name: 'begindate' },
            { label: '币种类型', name: 'scurtype' },
            { label: '币种种类', name: 'cruArray' },
            { label: '资金性质', name: 'saccfundkind' }
          ]
        },
        {
          title: '客户信息',
          arr: [
            { label: '存款人名称', name: 'sdepname' },
            { label: '行业归属', name: 'trade_type1' },
            { label: '电话', name: 'sdeptel' },
            { label: '地址', name: 'sdepaddress' },
            { label: '邮政编码', name: 'sdeppostcode' },
            { label: '存款人类别', name: 'sdepkind' },
            { label: '组织机构代码', name: 'sdeporgcode' },
            { label: '法定代表人/单位负责人', name: 'idepmanagestype' },
            { label: '姓名', name: 'sdepmanagername' },
            { label: '身份证件种类', name: 'sdepmancrekind' },
            { label: '身份证件号码', name: 'sdepmancrecode' },
            { label: '国家或地区', name: 'sDepManRegion' },
            { label: '注册地地区代码', name: 'sdepregarea' },
            { label: '注册资金币种', name: 'sdepfundkind' },
            { label: '注册资金(元)', name: 'fdepfund' },
            { label: '证明文件1种类', name: 'saccfiletype1' },
            { label: '证明文件1编号', name: 'saccfilecode1' },
            { label: '证明文件2种类', name: 'saccfiletype2' },
            { label: '证明文件2编号', name: 'saccfilecode2' },
            { label: '国税登记证号', name: 'sdepcountaxcode' },
            { label: '地税登记证号', name: 'sdepareataxcode' },
            {
              label: '无需办理税务登记证的文件或税务机关出具的证明',
              name: 'sdepnotaxfile'
            },
            { label: '取现标识', name: 'bcashsign' },
            { label: '经营范围', name: 'sdepwork' }
          ]
        },
        {
          title: '上级法人或主管单位信息',
          arr: [
            { label: '单位名称', name: 'sdeptname' },
            { label: '基本户开户许可证核准号', name: 'sdeptlic' },
            { label: '组织机构代码', name: 'sdeptmanorgcode' },
            { label: '法定代表人/单位负责人', name: 'sdeptmankind' },
            { label: '姓名', name: 'sdeptmanname' },
            { label: '身份证件种类', name: 'sdeptmancrekind' },
            { label: '身份证件号码', name: 'sdeptmancrecode' }
          ]
        }
      ]
    },
    // 6-一般存款账户
    general_acc: {
      width: '40%',
      top: '4vh',
      visible: false,
      column: 1,
      data: [
        {
          title: '账户信息',
          arr: [
            { label: '基本户开户许可证核准号', name: 'licno' },
            { label: '基本户开户地地区代码', name: 'area_code' },
            { label: '账号', name: 'accno' },
            { label: '币种类型', name: 'scurtype' },
            { label: '币种种类', name: 'cruArray' },
            { label: '开户日期', name: 'begindate' },
            { label: '证明文件种类', name: 'filetype' },
            { label: '证明文件号码', name: 'filecode' },
            { label: '备注', name: 'remark' }
          ]
        }
      ]
    },
    // 7-非预算单位
    nonbudget_com: {
      width: '98%',
      top: '4vh',
      visible: false,
      column: 2,
      data: [
        {
          title: '账户信息',
          visible: false,
          arr: [
            { label: '基本户开户许可证核准号', name: 'licno' },
            { label: '基本户开户地地区代码', name: 'area_code' },
            { label: '账号', name: 'accno' },
            { label: '开户日期', name: 'begindate' },
            { label: '币种类型', name: 'scurtype' },
            { label: '币种种类', name: 'cruArray' },
            { label: '证明文件1种类', name: 'filetype' },
            { label: '证明文件1编号', name: 'filecode' },
            { label: '资金性质', name: 'fundkind' },
            { label: '账户名称构成方式', name: 'imode' },
            { label: '备注', name: 'remark' }
          ]
        },
        {
          title: '资金管理人信息',
          visible: false,
          arr: [
            { label: '资金管理人姓名', name: 'saccdepname' },
            { label: '身份证件种类', name: 'saccdepcrekind' },
            { label: '身份证件编号', name: 'saccdepcrecode' }
          ]
        },
        {
          title: '内设部门信息',
          visible: false,
          arr: [
            { label: '内设部门名称', name: 'saccdepname' },
            { label: '负责人姓名', name: 'saccdepmanname' },
            { label: '身份证件种类', name: 'saccdepcrekind' },
            { label: '身份证件号码', name: 'saccdepcrecode' },
            { label: '电话', name: 'saccdeptel' },
            { label: '邮政编码', name: 'saccdeppostcode' },
            { label: '地址', name: 'saccdepaddress' }
          ]
        }
      ]
    },
    // 销户
    passAcc: {
      width: '40%',
      top: '5vh',
      visible: false,
      column: 1,
      data: [
        {
          title: '销户信息',
          arr: [
            { label: '账号', name: 'accno' },
            { label: '销户原因', name: 'deletereason' }
          ]
        }
      ]
    }
  }
}
// 非临时更改日期弹框字段
export const nontemporaryData = (that) => {
  return {
    data: {
      width: '50%',
      top: '5vh',
      visible: false,
      data: [
        {
          title: '',
          arr: [
            { label: '临时存款账户编号', name: 'tempno' },
            { label: '已打印开户许可证编号', name: 'slicno' }
          ]
        }
      ]
    }
  }
}
// 表头
export const configTable3 = (that) => [
  {
    name: 'fd_ent_name',
    label: '关联企业名称',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'report_type',
    label: '类型',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'fd_prin_name',
    label: '法人或单位负责人姓名',
    width: 150,
    id: uuidv1()
  },
  {
    name: 'fd_entorg_code',
    label: '组织机构代码',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'fd_type',
    label: '证件种类',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'fd_code',
    label: '证件号码',
    id: uuidv1()
  }
]
// 表头
export const configTable4 = (that) => [
  {
    name: 'trade_type',
    label: '行业归属',
    id: uuidv1()
  }
]
// 点击确定新增二次弹框页面  --- 操作类型为开户和变更
export const configTableData = (that) => {
  console.log(that.dialog4.configTableData)
  const { oper_type, acc_type, depo_type, change_vailddate } = that.objCopy
  const arrs = that.datas.AREA_CODE
  if (arrs) {
    if (arrs[0].label.length === 3) {
      arrs.forEach(item => {
        item.label = item.key + '-' + item.label
      })
    }
  }
  let isTrue = false// 是否选择变更展期
  let isChange = false// 是否为变更
  let isApproved = false// 非临时存款人类别是否为01 02 13 14
  if (change_vailddate) {
    isApproved = false
    if (
      oper_type === '2' &&
        acc_type === '4' &&
        change_vailddate === '1' &&
        (depo_type === '01' ||
      depo_type === '02' ||
      depo_type === '13' ||
      depo_type === '14')
    ) {
      isTrue = true
    } else {
      isTrue = false
    }
  } else {
    isApproved = true
  }


  if (oper_type === '2') {
    isChange = true
  } else {
    isChange = false
  }
  return {
    basic_type: {
      form_info1: {
        title: '账户基本信息',
        labelWidth: '20rem',
        data: {
          accno: {
            component: 'input',
            label: '账号',
            colSpan: 8,
            name: 'accno',
            config: {
              // rules: [{ required: true, message: '所属机构为必输' }]
            },
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: [],
            methods: {
              change(val) {
                const { is_change } = that.dialog2.config
                if (val === '1') {
                  is_change.hidden = false
                  is_change.config.rules[0].required = true
                } else {
                  is_change.hidden = true
                  is_change.config.rules[0].required = false
                }
                that.isVisible(that.dialog2.formData.acc_type)
              }
            }
          },
          begindate: {
            component: 'input',
            label: '开户日期',
            colSpan: 8,
            name: 'begindate',
            config: {},
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: []
          },
          saccbaselicno: {
            component: 'input',
            label: '原基本存款账户编号',
            colSpan: 8,
            name: 'saccbaselicno',
            config: {},
            componentProps: {
              clearable: true
            },
            options: []
          },
          scurtype: {
            component: 'select',
            label: '币种类型',
            colSpan: 8,
            name: 'scurtype',
            config: {},
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('AM_CURRENCY_TYPE')
          },
          cruArray: {
            component: 'select',
            label: '币种种类',
            colSpan: 8,
            name: 'cruArray',
            config: {},
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('CNY_TYPE')
          }
        },
        formData: {
          accno: '',
          begindate: '',
          saccbaselicno: '',
          scurtype: '',
          cruArray: ''
        }
      },
      form_info2: {
        title: '存款人基本信息',
        labelWidth: '20rem',
        data: {
          sdepname: {
            component: 'input',
            label: '存款人名称',
            colSpan: 8,
            name: 'sdepname',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: []
          },
          trade_type: {
            component: 'button',
            label: '行业归属',
            colSpan: 8,
            name: 'trade_type',
            config: {},
            componentProps: {},
            options: [],
            methods: {
              click(val) {
                that.handleBtn1('second')
              }
            }
          },
          entList: {
            component: 'button',
            label: '关联企业',
            colSpan: 8,
            name: 'entList',
            config: {},
            componentProps: {},
            options: [],
            methods: {
              click(val) {
                that.handleBtn2()
              }
            }
          },
          sdeptel: {
            component: 'input',
            label: '电话',
            colSpan: 8,
            name: 'sdeptel',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: []
          },
          sdepaddress: {
            component: 'input',
            label: '地址',
            colSpan: 8,
            name: 'sdepaddress',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: []
          },
          sdeppostcode: {
            component: 'input',
            label: '邮政编码',
            colSpan: 8,
            name: 'sdeppostcode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: []
          },
          sdepkind: {
            component: 'select',
            label: '存款人类别',
            colSpan: 8,
            name: 'sdepkind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: dictionaryFieds('DEPO_TYPE')
          },
          deffectdate: {
            component: 'input',
            label: '工商营业执照有效期',
            colSpan: 8,
            name: 'deffectdate',
            config: {},
            componentProps: {},
            options: []
          },
          sdeporgcode: {
            component: 'input',
            label: '组织机构代码',
            colSpan: 8,
            name: 'sdeporgcode',
            config: {},
            componentProps: {},
            options: []
          },
          idepmanagestype: {
            component: 'select',
            label: '法定代表人/单位负责人',
            colSpan: 8,
            name: 'idepmanagestype',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MANAGER_TYPE')
          },
          sdepmanagername: {
            component: 'input',
            label: '姓名',
            colSpan: 8,
            name: 'sdepmanagername',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdepcerkind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'sdepcerkind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          sdepcercode: {
            component: 'input',
            label: '身份证件号码',
            colSpan: 8,
            name: 'sdepcercode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sDepManRegion: {
            component: 'select',
            label: '国家或地区',
            colSpan: 8,
            name: 'sDepManRegion',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: that.nations
          },
          sdepregarea: {
            component: 'select',
            label: '注册地地区代码',
            colSpan: 8,
            name: 'sdepregarea',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              filterable: true,
              clearable: true
            },
            options: arrs
          },
          sdepfundkind: {
            component: 'select',
            label: '注册资金币种',
            colSpan: 8,
            name: 'sdepfundkind',
            config: {},
            componentProps: {
              disabled: false,
              clearable: true
            },
            options: [
              { label: '', value: '' },
              ...dictionaryFieds('REG_CNY_TYPE')
            ]
          },
          fdepfund: {
            component: 'input',
            label: '注册资金(元)',
            colSpan: 8,
            name: 'fdepfund',
            config: {},
            componentProps: {
              disabled: false
            },
            options: []
          },
          userCheckbox: {
            component: 'checkbox',
            label: '未标明注册资金',
            colSpan: 8,
            name: 'userCheckbox',
            config: {},
            componentProps: {},
            options: [{ label: '1', text: '' }],
            methods: {
              change: (datas, value) => {
                const { formData, data } =
                  that.dialog4.configTableData.form_info2
                if (datas.length !== 0) {
                  data.sdepfundkind.componentProps.disabled = true
                  data.fdepfund.componentProps.disabled = true
                  formData.sdepfundkind = ''
                  formData.fdepfund = ''
                } else {
                  data.sdepfundkind.componentProps.disabled = false
                  data.fdepfund.componentProps.disabled = false
                }
              }
            }
          },
          saccfiletype1: {
            component: 'select',
            label: '证明文件1种类',
            colSpan: 8,
            name: 'saccfiletype1',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options:
              depo_type === '01' ||
              depo_type === '02' ||
              depo_type === '13' ||
              depo_type === '14'
                ? dictionaryFieds('SACC_FILE_TYPE').filter(
                  (item) => item.value === '01'
                )
                : dictionaryFieds('SACC_FILE_TYPE').filter(
                  (item) =>
                    item.value === '02' ||
                      item.value === '03' ||
                      item.value === '04'
                )
          },
          saccfilecode1: {
            component: 'input',
            label: '证明文件1编号',
            colSpan: 8,
            name: 'saccfilecode1',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          saccfiletype2: {
            component: 'select',
            label: '证明文件2种类',
            colSpan: 8,
            name: 'saccfiletype2',
            config: {},
            componentProps: {
              clearable: true
            },
            options:
              (oper_type === '1' || oper_type === '2') &&
              (depo_type === '01' ||
                depo_type === '02' ||
                depo_type === '13' ||
                depo_type === '14')
                ? dictionaryFieds('SACC_FILE_TYPE').filter(
                  (item) =>
                    item.value === '02' ||
                      item.value === '03' ||
                      item.value === '04' ||
                      item.value === '08'
                )
                : dictionaryFieds('SACC_FILE_TYPE').filter(
                  (item) =>
                    item.value === '02' ||
                      item.value === '03' ||
                      item.value === '04'
                )
          },
          saccfilecode2: {
            component: 'input',
            label: '证明文件2编号',
            colSpan: 8,
            name: 'saccfilecode2',
            config: {},
            componentProps: {},
            options: []
          },
          sdepcountaxcode: {
            component: 'input',
            label: '国税登记证号',
            colSpan: 8,
            name: 'sdepcountaxcode',
            config: {},
            componentProps: {},
            options: [],
            methods: {
              change(val) {
                console.log(that.dialog4.configTableData)
                console.log(val)
              }
            }
          },
          sdepareataxcode: {
            component: 'input',
            label: '地税登记证号',
            colSpan: 8,
            name: 'sdepareataxcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdepnotaxfile: {
            component: 'input',
            label: '无需办理税务登记证的文件或税务机关出具的证明',
            colSpan: 8,
            name: 'sdepnotaxfile',
            config: {},
            componentProps: {},
            options: []
          },
          sremark: {
            component: 'input',
            label: '备注',
            colSpan: 8,
            name: 'sremark',
            config: {},
            componentProps: {},
            options: []
          },
          sdepwork: {
            component: 'input',
            label: '经营范围',
            colSpan: 8,
            name: 'sdepwork',
            config: {
              rules: isChange ? [{required: false}] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          }
        },
        formData: {
          sdepname: '',
          trade_type: '',
          entList: '',
          sdeptel: '',
          sdepaddress: '',
          sdeppostcode: '',
          sdepkind: '',
          deffectdate: '',
          sdeporgcode: '',
          idepmanagestype: '',
          sdepmanagername: '',
          sdepcerkind: '',
          sdepcercode: '',
          sDepManRegion: '',
          sdepregarea: '',
          sdepfundkind: '',
          fdepfund: '',
          userCheckbox: [],
          saccfiletype1: '',
          saccfilecode1: '',
          saccfiletype2: '',
          saccfilecode2: '',
          sdepcountaxcode: '',
          sdepareataxcode: '',
          sdepnotaxfile: '',
          sremark: '',
          sdepwork: ''
        }
      },
      form_info3: {
        title: '上级法人或主管单位信息',
        labelWidth: '20rem',
        data: {
          sdeptname: {
            component: 'input',
            label: '单位名称',
            colSpan: 8,
            name: 'sdeptname',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptlic: {
            component: 'input',
            label: '基本户开户许可证核准号',
            colSpan: 8,
            name: 'sdeptlic',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmanorgcode: {
            component: 'input',
            label: '组织机构代码',
            colSpan: 8,
            name: 'sdeptmanorgcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmankind: {
            component: 'select',
            label: '法定代表人/单位负责人',
            colSpan: 8,
            name: 'sdeptmankind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MANAGER_TYPE')
          },
          sdeptmanname: {
            component: 'input',
            label: '姓名',
            colSpan: 8,
            name: 'sdeptmanname',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmancrekind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'sdeptmancrekind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          sdeptmancrecode: {
            component: 'input',
            label: '身份证件号码',
            colSpan: 8,
            name: 'sdeptmancrecode',
            config: {},
            componentProps: {},
            options: []
          }
        },
        formData: {
          sdeptname: '',
          sdeptlic: '',
          sdeptmanorgcode: '',
          sdeptmankind: '',
          sdeptmanname: '',
          sdeptmancrekind: '',
          sdeptmancrecode: ''
        }
      }
    },
    budget_com: {
      form_info1: {
        title: '账户基本信息',
        titleNote: '(当选择“相关部门证明”，证明文件编号可以为空，否则为必输)',
        labelWidth: '20rem',
        hidden: false,
        data: {
          licno: {
            component: 'input',
            label: '基本户开户许可证核准号',
            colSpan: 8,
            name: 'licno',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
            },
            options: []
          },
          areacode: {
            component: 'select',
            label: '基本户开户地地区代码',
            colSpan: 8,
            name: 'areacode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              filterable: true,
              clearable: true
            },
            options: arrs
          },
          accno: {
            component: 'input',
            label: '账号',
            colSpan: 8,
            name: 'accno',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          begindate: {
            component: 'input',
            label: '开户日期',
            colSpan: 8,
            name: 'begindate',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          scurtype: {
            component: 'select',
            label: '币种类型',
            colSpan: 8,
            name: 'scurtype',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('AM_CURRENCY_TYPE')
          },
          cruArray: {
            component: 'select',
            label: '币种种类',
            colSpan: 8,
            name: 'cruArray',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('CNY_TYPE')
          },
          saccfiletype1: {
            component: 'select',
            label: '证明文件1种类',
            colSpan: 8,
            name: 'saccfiletype1',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
              clearable: true
            },
            options: dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) =>
                item.value === '09' ||
                item.value === '10' ||
                item.value === '11'
            ),
            methods: {
              change(val) {
                if (val === '09' || val === '11') {
                  that.dialog4.configTableData.form_info1.data.saccfilecode1.config =
                    {
                      rules: [{ required: true, message: '此处不能为空' }]
                    }
                } else {
                  that.dialog4.configTableData.form_info1.data.saccfilecode1.config =
                    {
                      rules: [{ required: false }]
                    }
                }
              }
            }
          },
          saccfilecode1: {
            component: 'input',
            label: '证明文件1编号',
            colSpan: 8,
            name: 'saccfilecode1',
            config: {},
            componentProps: {
              disabled: false
            },
            options: []
          },
          saccfiletype2: {
            component: 'select',
            label: '证明文件2种类',
            colSpan: 8,
            name: 'saccfiletype2',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '08'
            )
          },
          saccfilecode2: {
            component: 'input',
            label: '证明文件2编号',
            colSpan: 8,
            name: 'saccfilecode2',
            config: {},
            componentProps: {},
            options: []
          },
          saccfundkind: {
            component: 'select',
            label: '资金性质',
            colSpan: 8,
            name: 'saccfundkind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
              clearable: true
            },
            options: dictionaryFieds('MONEY_TYPE')
          },
          imode: {
            component: 'select',
            label: '账户名称构成方式',
            colSpan: 8,
            name: 'imode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
              clearable: true
            },
            options: dictionaryFieds('ACC_NAME_TYPE'),
            methods: {
              change(val) {
                console.log(that.dialog4.configTableData)
                const { form_info1, form_info2, form_info2_copy } =
                  that.dialog4.configTableData
                if (val === '0') {
                  form_info1.data.saccprefix.hidden = true
                  form_info1.data.saccpostfix.hidden = true
                  form_info2.hidden = false
                  form_info2_copy.hidden = true
                } else if (val === '1') {
                  form_info1.data.saccprefix.hidden = true
                  form_info1.data.saccpostfix.hidden = true
                  form_info2.hidden = true
                  form_info2_copy.hidden = false
                } else {
                  form_info1.data.saccprefix.hidden = false
                  form_info1.data.saccpostfix.hidden = false
                  form_info2.hidden = false
                  form_info2_copy.hidden = true
                }
              }
            }
          },
          saccprefix: {
            component: 'input',
            label: '账户名称前缀',
            colSpan: 8,
            hidden: true,
            name: 'saccprefix',
            config: {},
            componentProps: {},
            options: []
          },
          saccpostfix: {
            component: 'input',
            label: '账户名称后缀',
            colSpan: 8,
            hidden: true,
            name: 'saccpostfix',
            config: {},
            componentProps: {},
            options: []
          }
        },
        formData: {
          licno: '',
          areacode: '',
          accno: '',
          begindate: '',
          scurtype: '',
          cruArray: '',
          saccfiletype1: '',
          saccfilecode1: '',
          saccfiletype2: '',
          saccfilecode2: '',
          saccfundkind: '',
          imode: '',
          saccprefix: '',
          saccpostfix: ''
        }
      },
      form_info2: {
        title: '资金管理人信息',
        labelWidth: '20rem',
        hidden: false,
        data: {
          saccdepname: {
            component: 'input',
            label: '资金管理人姓名',
            colSpan: 8,
            name: 'saccdepname',
            config: {},
            componentProps: {},
            options: []
          },
          saccdepcrekind: {
            component: 'select',
            label: '资金管理人身份证件种类',
            colSpan: 8,
            name: 'saccdepcrekind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          saccdepcrecode: {
            component: 'input',
            label: '资金管理人身份证件编号',
            colSpan: 8,
            name: 'saccdepcrecode',
            config: {},
            componentProps: {
              clearable: true
            },
            options: []
          }
        },
        formData: {
          saccdepname: '',
          saccdepcrekind: '',
          saccdepcrecode: ''
        }
      },
      form_info2_copy: {
        title: '内设部门信息',
        labelWidth: '20rem',
        hidden: true,
        data: {
          saccdepname: {
            component: 'input',
            label: '内设部门名称',
            colSpan: 8,
            name: 'saccdepname',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
            },
            options: []
          },
          saccdepmanname: {
            component: 'input',
            label: '负责人姓名',
            colSpan: 8,
            name: 'saccdepmanname',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
              clearable: true
            },
            options: []
          },
          saccdepcrekind: {
            component: 'select',
            label: '负责人身份证件种类',
            colSpan: 8,
            name: 'saccdepcrekind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          saccdepcrecode: {
            component: 'input',
            label: '负责人身份证件编号',
            colSpan: 8,
            name: 'saccdepcrecode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
              clearable: true
            },
            options: []
          },
          saccdeptel: {
            component: 'input',
            label: '电话',
            colSpan: 8,
            name: 'saccdeptel',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
            },
            options: []
          },
          saccdeppostcode: {
            component: 'input',
            label: '邮政编码',
            colSpan: 8,
            name: 'saccdeppostcode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
            },
            options: []
          },
          saccdepaddress: {
            component: 'input',
            label: '地址',
            colSpan: 8,
            name: 'saccdepaddress',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              // disabled: true
            },
            options: []
          }
        },
        formData: {
          saccdepname: '',
          saccdepmanname: '',
          saccdepcrekind: '',
          saccdepcrecode: '',
          saccdeptel: '',
          saccdeppostcode: '',
          saccdepaddress: ''
        }
      }
    },
    temporary_org: {
      form_info1: {
        title: '账户基本信息',
        labelWidth: '20rem',
        data: {
          accno: {
            component: 'input',
            label: '账号',
            colSpan: 8,
            name: 'accno',
            config: {},
            componentProps: {
              disabled: true
            },
            options: [],
            methods: {
              change(val) {
                if (val === '1') {
                  that.dialog2.config.is_change.hidden = false
                } else {
                  that.dialog2.config.is_change.hidden = true
                }
                that.isVisible(that.dialog2.formData.acc_type)
              }
            }
          },
          begindate: {
            component: 'input',
            label: '开户日期',
            colSpan: 8,
            name: 'begindate',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          scurtype: {
            component: 'select',
            label: '币种类型',
            colSpan: 8,
            name: 'scurtype',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: oper_type === '1',
              clearable: true
            },
            options: dictionaryFieds('AM_CURRENCY_TYPE')
          },
          cruArray: {
            component: 'select',
            label: '币种种类',
            colSpan: 8,
            name: 'cruArray',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: oper_type === '1',
              clearable: true
            },
            options: dictionaryFieds('CNY_TYPE')
          },
          daccvailddate: {
            component: 'input',
            label: '有效日期',
            colSpan: 8,
            name: 'daccvailddate',
            config: {},
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: []
          }
        },
        formData: {
          accno: '',
          begindate: '',
          scurtype: '',
          cruArray: '',
          daccvailddate: ''
        }
      },
      form_info2: {
        title: '存款人基本信息',
        labelWidth: '20rem',
        data: {
          sdepname: {
            component: 'input',
            label: '存款人名称',
            colSpan: 8,
            name: 'sdepname',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          trade_type: {
            component: 'button',
            label: '行业归属',
            colSpan: 8,
            name: 'trade_type',
            config: {},
            componentProps: {},
            options: [],
            methods: {
              click(val) {
                that.handleBtn1()
              }
            }
          },
          sdeptel: {
            component: 'input',
            label: '电话',
            colSpan: 8,
            name: 'sdeptel',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdepaddress: {
            component: 'input',
            label: '地址',
            colSpan: 8,
            name: 'sdepaddress',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdeppostcode: {
            component: 'input',
            label: '邮政编码',
            colSpan: 8,
            name: 'sdeppostcode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdeporgcode: {
            component: 'input',
            label: '组织机构代码',
            colSpan: 8,
            name: 'sdeporgcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmankind: {
            component: 'select',
            label: '法定代表人/单位负责人',
            colSpan: 8,
            name: 'sdeptmankind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MANAGER_TYPE')
          },
          sdepmanagername: {
            component: 'input',
            label: '姓名',
            colSpan: 8,
            name: 'sdepmanagername',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdepmancrekind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'sdepmancrekind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          sdepmancrecode: {
            component: 'input',
            label: '身份证件号码',
            colSpan: 8,
            name: 'sdepmancrecode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sDepManRegion: {
            component: 'select',
            label: '国家或地区',
            colSpan: 8,
            name: 'sDepManRegion',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: that.nations
          },
          sdepfundkind: {
            component: 'select',
            label: '注册资金币种',
            colSpan: 8,
            name: 'sdepfundkind',
            config: {},
            componentProps: {
              disabled: false,
              clearable: true
            },
            options: [
              { label: '', value: '' },
              ...dictionaryFieds('REG_CNY_TYPE')
            ]
          },
          fdepfund: {
            component: 'input',
            label: '注册资金(元)',
            colSpan: 8,
            name: 'fdepfund',
            config: {},
            componentProps: {
              disabled: false
            },
            options: []
          },
          userCheckbox: {
            component: 'checkbox',
            label: '未标明注册资金',
            colSpan: 8,
            name: 'userCheckbox',
            config: {},
            componentProps: {},
            options: [{ label: '1', text: '' }],
            methods: {
              change: (datas, value) => {
                const { formData, data } =
                  that.dialog4.configTableData.form_info2
                if (datas.length !== 0) {
                  data.sdepfundkind.componentProps.disabled = true
                  data.fdepfund.componentProps.disabled = true
                  formData.sdepfundkind = ''
                  formData.fdepfund = ''
                } else {
                  data.sdepfundkind.componentProps.disabled = false
                  data.fdepfund.componentProps.disabled = false
                }
              }
            }
          },
          saccfiletype1: {
            component: 'select',
            label: '证明文件1种类',
            colSpan: 8,
            name: 'saccfiletype1',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '09' || item.value === '01'
            ),
            methods: {
              change(val) {
                if (val === '01') {
                  that.dialog4.configTableData.form_info2.data.sdepwork.config =
                    {
                      rules: [{ required: true, message: '此处不能为空' }]
                    }
                } else {
                  that.dialog4.configTableData.form_info2.data.sdepwork.config =
                    {
                      rules: [{ required: false }]
                    }
                }
              }
            }
          },
          saccfilecode1: {
            component: 'input',
            label: '证明文件1编号',
            colSpan: 8,
            name: 'saccfilecode1',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          sdepcountaxcode: {
            component: 'input',
            label: '国税登记证号',
            colSpan: 8,
            name: 'sdepcountaxcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdepareataxcode: {
            component: 'input',
            label: '地税登记证号',
            colSpan: 8,
            name: 'sdepareataxcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdepnotaxfile: {
            component: 'input',
            label: '无需办理税务登记证的文件或税务机关出具的证明',
            colSpan: 8,
            name: 'sdepnotaxfile',
            config: {},
            componentProps: {},
            options: []
          },
          sdepwork: {
            component: 'input',
            label: '经营范围',
            colSpan: 8,
            name: 'sdepwork',
            config: {
              rules: isChange ? [{required: false}] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          }
        },
        formData: {
          sdepname: '',
          trade_type: '',
          sdeptel: '',
          sdepaddress: '',
          sdeppostcode: '',
          sdeporgcode: '',
          sdeptmankind: '',
          sdepmanagername: '',
          sdepmancrekind: '',
          sdepmancrecode: '',
          sDepManRegion: '',
          sdepfundkind: '',
          fdepfund: '',
          userCheckbox: [],
          saccfiletype1: '',
          saccfilecode1: '',
          sdepcountaxcode: '',
          sdepareataxcode: '',
          sdepnotaxfile: '',
          sdepwork: ''
        }
      },
      form_info3: {
        title: '上级法人或主管单位信息',
        labelWidth: '20rem',
        data: {
          sdeptname: {
            component: 'input',
            label: '单位名称',
            colSpan: 8,
            name: 'sdeptname',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptlic: {
            component: 'input',
            label: '基本户开户许可证核准号',
            colSpan: 8,
            name: 'sdeptlic',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmanorgcode: {
            component: 'input',
            label: '组织机构代码',
            colSpan: 8,
            name: 'sdeptmanorgcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmankind: {
            component: 'select',
            label: '法定代表人/单位负责人',
            colSpan: 8,
            name: 'sdeptmankind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MANAGER_TYPE')
          },
          sdeptmanname: {
            component: 'input',
            label: '姓名',
            colSpan: 8,
            name: 'sdeptmanname',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmancrekind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'sdeptmancrekind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          sdeptmancrecode: {
            component: 'input',
            label: '身份证件号码',
            colSpan: 8,
            name: 'sdeptmancrecode',
            config: {},
            componentProps: {},
            options: []
          }
        },
        formData: {
          sdeptname: '',
          sdeptlic: '',
          sdeptmanorgcode: '',
          sdeptmankind: '',
          sdeptmanname: '',
          sdeptmancrekind: '',
          sdeptmancrecode: ''
        }
      }
    },
    nontemporary_org: {
      form_info1: {
        title: '账户基本信息',
        labelWidth: '20rem',
        data: {
          licno: {
            component: 'input',
            label: '基本户开户许可证核准号',
            colSpan: 8,
            hidden: isChange,
            name: 'licno',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          areacode: {
            component: 'select',
            label: '基本户开户地地区代码',
            colSpan: 8,
            hidden: isChange,
            name: 'areacode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              filterable: true,
              clearable: true
            },
            options: arrs
          },
          saccno: {
            component: 'input',
            label: '账号',
            colSpan: 8,
            name: 'saccno',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          saccreason: {
            component: 'select',
            label: '申请开户的原因',
            colSpan: 8,
            hidden: isApproved ? false : true,
            name: 'saccreason',
            config: {
              rules: isApproved ? [{ required: true, message: '此处不能为空' }] : []
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('SACCREASON'),
            methods: {
              change(val) {
                const { form_info1, form_info2 } = that.dialog4.configTableData
                if (val === '2') {
                  form_info2.hidden = true
                  form_info1.formData.saccfiletype1 = ''
                  form_info1.data.saccfiletype1.options =
                    dictionaryFieds('SACC_FILE_TYPE').filter(
                      (item) => item.value === '16'
                    )
                } else {
                  form_info2.hidden = false
                  form_info1.formData.saccfiletype1 = ''
                  form_info1.data.saccfiletype1.options =
                    dictionaryFieds('SACC_FILE_TYPE').filter(
                      (item) => item.value === '14' || item.value === '15'
                    )

                }
              }
            }
          },
          begindate: {
            component: 'input',
            label: '开户日期',
            colSpan: 8,
            hidden: isChange,
            name: 'begindate',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          daccvailddate: {
            component: 'input',
            label: '申请展期的临存款账户有效日期',
            colSpan: 8,
            hidden: isApproved ? true : isTrue ? false : true,
            name: 'daccvailddate',
            config: {},
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          scurtype: {
            component: 'select',
            label: '币种类型',
            colSpan: 8,
            hidden: isApproved ? false : true,
            name: 'scurtype',
            config: {
              rules: isApproved ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isApproved ? false : true,
              clearable: true
            },
            options: dictionaryFieds('AM_CURRENCY_TYPE')
          },
          cruArray: {
            component: 'select',
            label: '币种种类',
            colSpan: 8,
            hidden: isApproved ? false : true,
            name: 'cruArray',
            config: {
              rules: isApproved ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isApproved ? false : true,
              clearable: true
            },
            options: dictionaryFieds('CNY_TYPE')
          },
          saccfiletype1: {
            component: 'select',
            label: '证明文件种类',
            colSpan: 8,
            hidden: isApproved ? false : (isTrue ? true : false),
            name: 'saccfiletype1',
            config: {
              rules: isChange ? (isApproved ? [] : (isTrue ? [] : [{ required: true, message: '此处不能为空' }])) : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: isChange ? (isApproved ? dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '14' || item.value === '15' ) : !isTrue ? dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '14' || item.value === '15' || item.value === '16'
            ) : []) : dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '14' || item.value === '15' )
          },
          saccfilecode1: {
            component: 'input',
            label: '证明文件号码',
            colSpan: 8,
            hidden: isApproved ? false : (isTrue ? true : false),
            name: 'saccfilecode1',
            config: {
              rules: isChange ? (isApproved ? [] : (isTrue ? [] : [{ required: true, message: '此处不能为空' }])) : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          }
        },
        formData: {
          licno: '',
          areacode: '',
          saccno: '',
          saccreason: '',
          begindate: '',
          daccvailddate: '',
          scurtype: '',
          cruArray: '',
          saccfiletype1: '',
          saccfilecode1: ''
        }
      },
      form_info2: {
        title: '建筑施工及安装单位信息',
        labelWidth: '20rem',
        hidden: false,
        data: {
          saccdepname: {
            component: 'input',
            label: '项目部名称',
            colSpan: 8,
            name: 'saccdepname',
            config: {},
            componentProps: {},
            options: []
          },
          saccdepmanname: {
            component: 'input',
            label: '负责人姓名',
            colSpan: 8,
            name: 'saccdepmanname',
            config: {},
            componentProps: {},
            options: []
          },
          saccdepcrekind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'saccdepcrekind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          saccdepcrecode: {
            component: 'input',
            label: '身份证件编号',
            colSpan: 8,
            name: 'saccdepcrecode',
            config: {},
            componentProps: {},
            options: []
          },
          saccdeptel: {
            component: 'input',
            label: '电话',
            colSpan: 8,
            name: 'saccdeptel',
            config: {},
            componentProps: {},
            options: []
          },
          saccdeppostcode: {
            component: 'input',
            label: '邮政编码',
            colSpan: 8,
            name: 'saccdeppostcode',
            config: {},
            componentProps: {},
            options: []
          },
          saccdepaddress: {
            component: 'input',
            label: '地址',
            colSpan: 8,
            name: 'saccdepaddress',
            config: {},
            componentProps: {},
            options: []
          }
        },
        formData: {
          saccdepname: '',
          saccdepmanname: '',
          saccdepcrekind: '',
          saccdepcrecode: '',
          saccdeptel: '',
          saccdeppostcode: '',
          saccdepaddress: ''
        }
      }
    },
    special_com: {
      form_info1: {
        title: '账户基本信息',
        labelWidth: '20rem',
        data: {
          accno: {
            component: 'input',
            label: '账号',
            colSpan: 8,
            name: 'accno',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true
            },
            options: []
          },
          begindate: {
            component: 'input',
            label: '开户日期',
            colSpan: 8,
            name: 'begindate',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          scurtype: {
            component: 'select',
            label: '币种类型',
            colSpan: 8,
            name: 'scurtype',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('AM_CURRENCY_TYPE')
          },
          cruArray: {
            component: 'select',
            label: '币种种类',
            colSpan: 8,
            name: 'cruArray',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true
            },
            options: dictionaryFieds('CNY_TYPE')
          },
          saccfundkind: {
            component: 'select',
            label: '资金性质',
            colSpan: 8,
            name: 'saccfundkind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MONEY_TYPE')
          }
        },
        formData: {
          accno: '',
          begindate: '',
          scurtype: '',
          cruArray: '',
          saccfundkind: ''
        }
      },
      form_info2: {
        title: '存款人基本信息',
        labelWidth: '20rem',
        data: {
          sdepname: {
            component: 'input',
            label: '存款人名称',
            colSpan: 8,
            name: 'sdepname',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          trade_type: {
            component: 'button',
            label: '行业归属',
            colSpan: 8,
            name: 'trade_type',
            config: {},
            componentProps: {},
            options: [],
            methods: {
              click(val) {
                that.handleBtn1()
              }
            }
          },
          sdeptel: {
            component: 'input',
            label: '电话',
            colSpan: 8,
            name: 'sdeptel',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdepaddress: {
            component: 'input',
            label: '地址',
            colSpan: 8,
            name: 'sdepaddress',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdeppostcode: {
            component: 'input',
            label: '邮政编码',
            colSpan: 8,
            name: 'sdeppostcode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sdepkind: {
            component: 'select',
            label: '存款人类别',
            colSpan: 8,
            name: 'sdepkind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: dictionaryFieds('DEPO_TYPE')
          },
          sdeporgcode: {
            component: 'input',
            label: '组织机构代码',
            colSpan: 8,
            name: 'sdeporgcode',
            config: {},
            componentProps: {},
            options: []
          },
          idepmanagestype: {
            component: 'select',
            label: '法定代表人/单位负责人',
            colSpan: 8,
            name: 'idepmanagestype',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MANAGER_TYPE')
          },
          sdepmanagername: {
            component: 'input',
            label: '姓名',
            colSpan: 8,
            name: 'sdepmanagername',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true
            },
            options: []
          },
          sdepmancrekind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'sdepmancrekind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          sdepmancrecode: {
            component: 'input',
            label: '身份证件号码',
            colSpan: 8,
            name: 'sdepmancrecode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          },
          sDepManRegion: {
            component: 'select',
            label: '国家或地区',
            colSpan: 8,
            name: 'sDepManRegion',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: that.nations
          },
          sdepregarea: {
            component: 'select',
            label: '注册地地区代码',
            colSpan: 8,
            name: 'sdepregarea',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              filterable: true,
              clearable: true
            },
            options: arrs
          },
          sdepfundkind: {
            component: 'select',
            label: '注册资金币种',
            colSpan: 8,
            name: 'sdepfundkind',
            config: {},
            componentProps: {
              disabled: false,
              clearable: true
            },
            options: [
              { label: '', value: '' },
              ...dictionaryFieds('REG_CNY_TYPE')
            ]
          },
          fdepfund: {
            component: 'input',
            label: '注册资金(元)',
            colSpan: 8,
            name: 'fdepfund',
            config: {},
            componentProps: {
              disabled: false
            },
            options: []
          },
          userCheckbox: {
            component: 'checkbox',
            label: '未标明注册资金',
            colSpan: 8,
            name: 'userCheckbox',
            config: {},
            componentProps: {},
            options: [{ label: '1', text: '' }],
            methods: {
              change: (datas, value) => {
                console.log(that.dialog4.configTableData)
                const { formData, data } =
                  that.dialog4.configTableData.form_info2
                if (datas.length !== 0) {
                  data.sdepfundkind.componentProps.disabled = true
                  data.fdepfund.componentProps.disabled = true
                  formData.sdepfundkind = ''
                  formData.fdepfund = ''
                } else {
                  data.sdepfundkind.componentProps.disabled = false
                  data.fdepfund.componentProps.disabled = false
                }
              }
            }
          },
          saccfiletype1: {
            component: 'select',
            label: '证明文件1种类',
            colSpan: 8,
            name: 'saccfiletype1',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '12' || item.value === '17'
            )
          },
          saccfilecode1: {
            component: 'input',
            label: '证明文件1编号',
            colSpan: 8,
            name: 'saccfilecode1',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          saccfiletype2: {
            component: 'select',
            label: '证明文件2种类',
            colSpan: 8,
            name: 'saccfiletype2',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '13' || item.value === '17'
            )
          },
          saccfilecode2: {
            component: 'input',
            label: '证明文件2编号',
            colSpan: 8,
            name: 'saccfilecode2',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          sdepcountaxcode: {
            component: 'input',
            label: '国税登记证号',
            colSpan: 8,
            name: 'sdepcountaxcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdepareataxcode: {
            component: 'input',
            label: '地税登记证号',
            colSpan: 8,
            name: 'sdepareataxcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdepnotaxfile: {
            component: 'input',
            label: '无需办理税务登记证的文件或税务机关出具的证明',
            colSpan: 8,
            name: 'sdepnotaxfile',
            config: {},
            componentProps: {},
            options: []
          },
          cash_sign: {
            component: 'select',
            label: '取现标识',
            colSpan: 8,
            name: 'cash_sign',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('CASH_SIGN')
          },
          sdepwork: {
            component: 'input',
            label: '经营范围',
            colSpan: 8,
            name: 'sdepwork',
            config: {
              rules: isChange ? [{required: false}] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true
            },
            options: []
          }
        },
        formData: {
          sdepname: '',
          trade_type: '',
          sdeptel: '',
          sdepaddress: '',
          sdeppostcode: '',
          sdepkind: '',
          sdeporgcode: '',
          idepmanagestype: '',
          sdepmanagername: '',
          sdepmancrekind: '',
          sdepmancrecode: '',
          sDepManRegion: '',
          sdepregarea: '',
          sdepfundkind: '',
          fdepfund: '',
          userCheckbox: [],
          saccfiletype1: '',
          saccfilecode1: '',
          saccfiletype2: '',
          saccfilecode2: '',
          sdepcountaxcode: '',
          sdepareataxcode: '',
          sdepnotaxfile: '',
          cash_sign: '0',
          sdepwork: ''
        }
      },
      form_info3: {
        title: '上级法人或主管单位信息',
        labelWidth: '20rem',
        data: {
          sdeptname: {
            component: 'input',
            label: '单位名称',
            colSpan: 8,
            name: 'sdeptname',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptlic: {
            component: 'input',
            label: '基本户开户许可证核准号',
            colSpan: 8,
            name: 'sdeptlic',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmanorgcode: {
            component: 'input',
            label: '组织机构代码',
            colSpan: 8,
            name: 'sdeptmanorgcode',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmankind: {
            component: 'select',
            label: '法定代表人/单位负责人',
            colSpan: 8,
            name: 'sdeptmankind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MANAGER_TYPE')
          },
          sdeptmanname: {
            component: 'input',
            label: '姓名',
            colSpan: 8,
            name: 'sdeptmanname',
            config: {},
            componentProps: {},
            options: []
          },
          sdeptmancrekind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'sdeptmancrekind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          sdeptmancrecode: {
            component: 'input',
            label: '身份证件号码',
            colSpan: 8,
            name: 'up_mancrecode',
            config: {},
            componentProps: {},
            options: []
          }
        },
        formData: {
          sdeptname: '',
          sdeptlic: '',
          sdeptmanorgcode: '',
          sdeptmankind: '',
          sdeptmanname: '',
          sdeptmancrekind: '',
          sdeptmancrecode: ''
        }
      }
    },
    general_acc: {
      form_info1: {
        title: '账号基本信息',
        titleNote:
          '(当操作员选择“借款合同”时,证明文件编号为必输项,反之可以为空)',
        labelWidth: '20rem',
        data: {
          licno: {
            component: 'input',
            label: '基本户开户许可证核准号',
            colSpan: 8,
            name: 'licno',
            hidden: oper_type === '2',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          area_code: {
            component: 'select',
            label: '基本户开户地地区代码',
            colSpan: 8,
            name: 'area_code',
            hidden: oper_type === '2',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              filterable: true,
              clearable: true
            },
            options: arrs
          },
          accno: {
            component: 'input',
            label: '账号',
            colSpan: 8,
            name: 'accno',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true
            },
            options: []
          },
          begindate: {
            component: 'input',
            label: '开户日期',
            colSpan: 8,
            name: 'begindate',
            hidden: that.dialog2.formData.oper_type === '2',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          scurtype: {
            component: 'select',
            label: '币种类型',
            colSpan: 8,
            name: 'scurtype',
            config: {},
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('AM_CURRENCY_TYPE')
          },
          cruArray: {
            component: 'select',
            label: '币种种类',
            colSpan: 8,
            name: 'cruArray',
            config: {},
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('CNY_TYPE')
          },
          filetype: {
            component: 'select',
            label: '证明文件种类',
            colSpan: 8,
            name: 'filetype',
            config: {},
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) => item.value === '06' || item.value === '07'
            ),
            methods: {
              change(val) {
                if (val === '06') {
                  that.dialog4.configTableData.form_info1.data.filecode.config =
                    {
                      rules: [{ required: true, message: '此处不能为空' }]
                    }
                } else {
                  that.dialog4.configTableData.form_info1.data.filecode.config =
                    {
                      rules: [{ required: false }]
                    }
                }
              }
            }
          },
          filecode: {
            component: 'input',
            label: '证明文件号码',
            colSpan: 8,
            name: 'filecode',
            config: {},
            componentProps: {},
            options: []
          },
          remark: {
            component: 'input',
            label: '备注',
            colSpan: 8,
            name: 'remark',
            config: {},
            componentProps: {},
            options: []
          }
        },
        formData: {
          licno: '',
          area_code: '',
          accno: '',
          begindate: '',
          scurtype: '',
          cruArray: '',
          filetype: '',
          filecode: '',
          remark: ''
        }
      }
    },
    nonbudget_com: {
      form_info1: {
        title: '账号基本信息',
        titleNote: '(当选择“相关部门证明”，证明文件编号可以为空，否则为必输)',
        labelWidth: '20rem',
        hidden: false,
        data: {
          licno: {
            component: 'input',
            label: '基本户开户许可证核准号',
            colSpan: 8,
            name: 'licno',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: isChange ? false : true,
              clearable: true
            },
            options: []
          },
          area_code: {
            component: 'select',
            label: '基本户开户地地区代码',
            colSpan: 8,
            name: 'area_code',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              filterable: true,
              clearable: true
            },
            options: arrs
          },
          accno: {
            component: 'input',
            label: '账号',
            colSpan: 8,
            name: 'accno',
            config: {
              rules: [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              disabled: true
            },
            options: []
          },
          begindate: {
            component: 'input',
            label: '开户日期',
            colSpan: 8,
            name: 'begindate',
            config: {},
            componentProps: {
              disabled: true
            },
            options: []
          },
          scurtype: {
            component: 'select',
            label: '币种类型',
            colSpan: 8,
            name: 'scurtype',
            config: {},
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('AM_CURRENCY_TYPE')
          },
          cruArray: {
            component: 'select',
            label: '币种种类',
            colSpan: 8,
            name: 'cruArray',
            config: {},
            componentProps: {
              disabled: true,
              clearable: true
            },
            options: dictionaryFieds('CNY_TYPE')
          },
          filetype: {
            component: 'select',
            label: '证明文件1种类',
            colSpan: 8,
            name: 'filetype',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('SACC_FILE_TYPE').filter(
              (item) =>
                item.value === '09' ||
                item.value === '10' ||
                item.value === '11'
            ),
            methods: {
              change(val) {
                if (val === '09' || val === '11') {
                  that.dialog4.configTableData.form_info1.data.filecode.config =
                    {
                      rules: [{ required: true, message: '此处不能为空' }]
                    }
                } else {
                  that.dialog4.configTableData.form_info1.data.filecode.config =
                    {
                      rules: [{ required: false }]
                    }
                }
              }
            }
          },
          filecode: {
            component: 'input',
            label: '证明文件1号码',
            colSpan: 8,
            name: 'filecode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          fundkind: {
            component: 'select',
            label: '资金性质',
            colSpan: 8,
            name: 'fundkind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('MONEY_TYPE')
          },
          imode: {
            component: 'select',
            label: '账户名称构成方式',
            colSpan: 8,
            name: 'imode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('ACC_NAME_TYPE'),
            methods: {
              change(val) {
                const { form_info1, form_info2, form_info2_copy } =
                  that.dialog4.configTableData
                if (val === '1') {
                  form_info1.data.saccprefix.hidden = true
                  form_info1.data.saccpostfix.hidden = true
                  form_info1.data.saccpostfix.config.rules[0].required = false
                  form_info2_copy.hidden = false
                  form_info2.hidden = true
                } else if (val === '2') {
                  form_info2_copy.hidden = true
                  form_info2.hidden = false
                  form_info1.data.saccprefix.hidden = false
                  form_info1.data.saccpostfix.hidden = false
                  form_info1.data.saccpostfix.config.rules[0].required = true
                  form_info1.data.saccpostfix.config.rules[0].message = '此处不能为空'
                } else {
                  form_info1.data.saccprefix.hidden = true
                  form_info1.data.saccpostfix.hidden = true
                  form_info1.data.saccpostfix.config.rules[0].required = false
                  form_info2_copy.hidden = true
                  form_info2.hidden = false
                }
              }
            }
          },
          saccprefix: {
            component: 'input',
            label: '账户名称前缀',
            colSpan: 8,
            name: 'saccprefix',
            hidden: true,
            config: {},
            componentProps: {},
            options: []
          },
          saccpostfix: {
            component: 'input',
            label: '账户名称后缀',
            colSpan: 8,
            name: 'saccpostfix',
            hidden: true,
            config: {
              rules: [{ required: false }]
            },
            componentProps: {},
            options: []
          },
          remark: {
            component: 'input',
            label: '备注',
            colSpan: 8,
            name: 'remark',
            config: {},
            componentProps: {},
            options: []
          }
        },
        formData: {
          licno: '',
          area_code: '',
          accno: '',
          begindate: '',
          scurtype: '',
          cruArray: '',
          filetype: '',
          filecode: '',
          fundkind: '',
          imode: '',
          saccprefix: '',
          saccpostfix: '',
          remark: ''
        }
      },
      form_info2: {
        title: '资金管理人信息',
        labelWidth: '20rem',
        hidden: false,
        data: {
          saccdepname: {
            component: 'input',
            label: '资金管理人姓名',
            colSpan: 8,
            name: 'saccdepname',
            config: {},
            componentProps: {},
            options: []
          },
          saccdepcrekind: {
            component: 'select',
            label: '资金管理人身份证件种类',
            colSpan: 8,
            name: 'saccdepcrekind',
            config: {},
            componentProps: {
              clearable: true
            },
            options: []
          },
          saccdepcrecode: {
            component: 'input',
            label: '资金管理人身份证件编号',
            colSpan: 8,
            name: 'saccdepcrecode',
            config: {},
            componentProps: {
              clearable: true
            },
            options: []
          }
        },
        formData: {
          saccdepname: '',
          saccdepcrekind: '',
          saccdepcrecode: ''
        }
      },
      form_info2_copy: {
        title: '内设部门信息',
        labelWidth: '20rem',
        hidden: true,
        data: {
          saccdepname: {
            component: 'input',
            label: '内设部门名称',
            colSpan: 8,
            name: 'saccdepname',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          saccdepmanname: {
            component: 'input',
            label: '负责人姓名',
            colSpan: 8,
            name: 'saccdepmanname',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          saccdepcrekind: {
            component: 'select',
            label: '身份证件种类',
            colSpan: 8,
            name: 'saccdepcrekind',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {
              clearable: true
            },
            options: dictionaryFieds('CER_TYPE')
          },
          saccdepcrecode: {
            component: 'input',
            label: '身份证件号码',
            colSpan: 8,
            name: 'saccdepcrecode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          saccdeptel: {
            component: 'input',
            label: '电话',
            colSpan: 8,
            name: 'saccdeptel',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          saccdeppostcode: {
            component: 'input',
            label: '邮政编码',
            colSpan: 8,
            name: 'saccdeppostcode',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          },
          saccdepaddress: {
            component: 'input',
            label: '地址',
            colSpan: 8,
            name: 'saccdepaddress',
            config: {
              rules: isChange ? [] : [{ required: true, message: '此处不能为空' }]
            },
            componentProps: {},
            options: []
          }
        },
        formData: {
          saccdepname: '',
          saccdepmanname: '',
          saccdepcrekind: '',
          saccdepcrecode: '',
          saccdeptel: '',
          saccdeppostcode: '',
          saccdepaddress: ''
        }
      }
    }
  }
}
// 点击确定新增二次弹框页面   --- 操作类型 为销户
export const passData = (that) => ({
  form_info1: {
    title: '销户信息',
    labelWidth: '20rem',
    data: {
      acc_no: {
        component: 'input',
        label: '账号',
        colSpan: 24,
        name: 'acc_no',
        config: {
          rules: [{ required: true, message: '此处为必填' }]
        },
        componentProps: {},
        options: []
      },
      close_reason: {
        component: 'select',
        label: '销户原因',
        colSpan: 24,
        name: 'close_reason',
        config: {
          rules: [{ required: true, message: '此处为必填' }]
        },
        componentProps: {
          clearable: true
        },
        options: dictionaryFieds('ACC_CLOSE_REASON')
      }
    },
    formData: {
      acc_no: '',
      close_reason: ''
    }
  }
})

// 关联企业
export const dialogData2 = (that) => {
  return {
    hy_type: {
      component: 'select',
      label: '行业归属',
      colSpan: 18,
      hidden: true,
      name: 'hy_type',
      config: {},
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('HD_TYPE').filter(item => item.value !== 'U')
    },
    fd_ent_name: {
      component: 'input',
      label: '关联企业名称',
      colSpan: 18,
      hidden: false,
      name: 'fd_ent_name',
      config: {},
      componentProps: {},
      options: []
    },
    fd_prin_name: {
      component: 'input',
      label: '法人或单位负责人姓名',
      colSpan: 18,
      hidden: false,
      name: 'fd_prin_name',
      config: {},
      componentProps: {},
      options: []
    },
    fd_entorg_code: {
      component: 'input',
      label: '组织机构代码',
      colSpan: 18,
      hidden: false,
      name: 'fd_entorg_code',
      config: {},
      componentProps: {},
      options: []
    },
    fd_type: {
      component: 'select',
      label: '证件种类',
      colSpan: 18,
      hidden: false,
      name: 'fd_type',
      config: {},
      componentProps: {
        clearable: true
      },
      options: dictionaryFieds('CER_TYPE')
    },
    fd_code: {
      component: 'input',
      label: '证件号码',
      colSpan: 18,
      hidden: false,
      name: 'fd_code',
      config: {},
      componentProps: {},
      options: []
    }
  }
}

// 打印销户转户的弹款表头
export const cancelConfig = (that) => [
  {
    name: 'area_code',
    label: '开户地地区代码',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'open_bank',
    label: '开户银行名称',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'acc_type',
    label: '账户性质',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'acc_no',
    label: '账号',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'acc_name',
    label: '账户名称',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'open_date',
    label: '开户日期',
    width: 120,
    id: uuidv1()
  },
  {
    name: 'acc_state',
    label: '账户状态',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'delete_date',
    label: '销户日期',
    width: 100,
    id: uuidv1()
  }

]

