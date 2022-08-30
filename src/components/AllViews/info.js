import { v1 as uuidv1 } from 'uuid'

export const describeConfig = (that) => ({
  zhxx: {
    message: [
      {
        title: '账户基本信息',
        arr: [
          { label: '账号', name: 'acc_no' },
          { label: '开户日期', name: 'open_date' },
          { label: '原基本存款账户编号', name: 'old_baselicno' }
        ]
      },
      {
        title: '存款人基本信息',
        arr: [
          { label: '存款人名称', name: 'cus_name' },
          { label: '电话', name: 'reg_tel' },
          { label: '注册地址', name: 'reg_adr' },
          { label: '邮政编码', name: 'zcode' },
          { label: '存款人类别', name: 'depo_type' },
          { label: '工商营业执照有效期', name: 'deffect_date' },
          { label: '组织机构代码', name: 'org_no' },
          { label: '法定代表人/单位负责人', name: 'managestype' },
          { label: '姓名', name: 'legal_name' },
          { label: '法定代表人身份证件种类', name: 'legal_type' },
          { label: '法定代表人身份证件号码', name: 'legal_id' },
          { label: '注册地区代码', name: 'adr_id' },
          { label: '注册资金金额', name: 'reg_money' },
          { label: '经营范围', name: 'reg_scope' },
          { label: '证明文件1种类', name: 'file_type1' },
          { label: '证明文件1号码', name: 'file_code1' },
          { label: '证明文件2种类', name: 'file_type2' },
          { label: '证明文件2号码', name: 'file_code2' },
          { label: '备注', name: 'sremark' }
        ]
      },
      {
        title: '上级法人或主管单位信息',
        arr: [
          { label: '单位名称', name: 'up_sdepname' },
          { label: '基本存款账户开户许可证核准号', name: 'up_sdeplic' },
          { label: '组织机构代码', name: 'up_sdeporgcode' },
          { label: '法定代表人/单位负责人', name: 'up_managestype' },
          { label: '姓名', name: 'up_manname' },
          { label: '法定代表人身份证件种类', name: 'up_mancrekind' },
          { label: '法定代表人身份证件号码', name: 'up_mancrecode' }
        ]
      }
    ]
  },
  khxx: {
    message: [
      {
        title: '基本信息',
        arr: [
          { label: '开户许可证核准号', name: 'license_no' },
          { label: '统一社会信用代码', name: 'ent_credit_no' },
          { label: '客户名称', name: 'cus_name' },
          { label: '客户类型', name: 'cus_type' },
          { label: '注册资本', name: 'reg_money' },
          { label: '成立日期', name: 'start_date' },
          { label: '核准日期', name: 'check_date' },
          { label: '注销日期', name: 'end_date' },
          { label: '人行行业类型', name: 'hd_type' },
          { label: '存款人类别', name: 'depo_type' },
          { label: '地区代码', name: 'adr_id' },
          { label: '邮政编码', name: 'zcode' },
          { label: '经办人', name: 'agent_name' },
          { label: '经办人证件号', name: 'agent_id' },
          { label: '经办人电话', name: 'agent_phone' },
          { label: '经办人证件到期日', name: 'agent_end' },
          { label: '注册地址', name: 'reg_adr' },
          { label: '经营范围', name: 'reg_scope' }
        ]
      },
      {
        title: '法定代表人信息',
        arr: [
          { label: '法定代表人', name: 'legal_name' },
          { label: '法定代表人证件号', name: 'legal_id' },
          { label: '法定代表人联系电话', name: 'legal_phone' },
          { label: '法定代表人证件到期日', name: 'legal_end' }
        ]
      },
      {
        title: '组织机构代码证信息',
        arr: [{ label: '组织机构代码', name: 'org_no' }]
      }
    ]
  },
  khqx_khxx: {
    message: [
      {
        title: '账户基本信息',
        arr: [
          { label: '开户许可证核准号', name: 'license_no' },
          { label: '统一社会信用代码', name: 'ent_credit_no' },
          { label: '客户名称', name: 'cus_name' },
          { label: '客户类型', name: 'cus_type' },
          { label: '注册资本', name: 'reg_money' },
          { label: '成立日期', name: 'start_date' },
          { label: '注销日期', name: 'end_date' },
          { label: '人行行业类型', name: 'hd_type' },
          { label: '存款人类别', name: 'depo_type' },
          { label: '地区代码', name: 'adr_id' },
          { label: '邮政编码', name: 'zcode' },
          { label: '经办人', name: 'agent_name' },
          { label: '经办人证件号', name: 'agent_id' },
          { label: '经办人电话', name: 'agent_phone' },
          { label: '经办人证件到期日', name: 'agent_end' },
          { label: '注册地址', name: 'reg_adr' },
          { label: '经营范围', name: 'reg_scope' }
        ]
      },
      {
        title: '法定代表人信息',
        arr: [
          { label: '法定代表人', name: 'legal_name' },
          { label: '法定代表人证件号', name: 'legal_id' },
          { label: '法定代表人联系电话', name: 'legal_phone' },
          { label: '法定代表人证件到期日', name: 'legal_end' }
        ]
      },
      {
        title: '组织机构代码证信息',
        arr: [{ label: '组织机构代码', name: 'org_no' }]
      }
    ]
  }
})
export const allData = (that) => ({
  zhxx: {
    acc_no: '',
    open_date: '',
    old_baselicno: '',
    cus_name: '',
    reg_tel: '',
    reg_adr: '',
    zcode: '',
    depo_type: '',
    deffect_date: '',
    managestype: '',
    legal_name: '',
    legal_type: '',
    legal_id: '',
    adr_id: '',
    reg_money: '',
    reg_scope: '',
    file_type1: '',
    file_code1: '',
    file_type2: '',
    file_code2: '',
    sremark: '',
    up_sdepname: '',
    up_sdeplic: '',
    up_sdeporgcode: '',
    up_managestype: '',
    up_manname: '',
    up_mancrekind: '',
    up_mancrecode: ''
  },
  khxx: {
    license_no: '',
    ent_credit_no: '',
    cus_name: '',
    cus_type: '',
    reg_money: '',
    start_date: '',
    check_date: '',
    end_date: '',
    hd_type: '',
    depo_type: '',
    adr_id: '',
    zcode: '',
    agent_name: '',
    agent_id: '',
    agent_phone: '',
    agent_end: '',
    reg_adr: '',
    reg_scope: '',
    legal_name: '',
    legal_id: '',
    legal_phone: '',
    legal_end: '',
    org_no: ''
  },
  bbxx: {
    tableColumn: [
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
    ],
    tableData: [],
    listLoading: true
  },
  glzhxx: {
    tableColumn: [
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
        width: 80,
        id: uuidv1()
      },
      {
        name: 'acc_state',
        label: '账户状态',
        width: 80,
        id: uuidv1()
      }
    ],
    tableData: [],
    listLoading: true
  },
  khbgjl: {
    tableColumn: [
      {
        name: 'rn',
        label: '序号',
        width: 50,
        id: uuidv1()
      },
      {
        name: 'cus_oper_type',
        label: '操作类型',
        id: uuidv1()
      },
      {
        name: 'last_modi_date',
        label: '操作记录时间',
        id: uuidv1()
      },
      {
        name: 'cus_no',
        label: '客户编号',
        id: uuidv1()
      },
      {
        name: 'cus_name',
        label: '客户名称',
        id: uuidv1()
      },
      {
        name: 'ent_credit_no',
        label: '统一社会信用代码',
        id: uuidv1()
      },
      {
        name: 'reg_no',
        label: '注册号',
        id: uuidv1()
      },

      {
        name: 'cus_type',
        label: '企业类型',
        id: uuidv1()
      },
      {
        name: 'legal_name',
        label: '法人',
        id: uuidv1()
      },
      {
        name: 'status',
        label: '经营状态',
        id: uuidv1()
      },

      {
        name: 'start_date',
        label: '成立时间',
        id: uuidv1()
      }
    ],
    tableData: [],
    listLoading: true
  },
  khqx_khxx: {
    license_no: '',
    ent_credit_no: '',
    cus_name: '',
    cus_type: '',
    reg_money: '',
    start_date: '',
    end_date: '',
    hd_type: '',
    depo_type: '',
    adr_id: '',
    zcode: '',
    agent_name: '',
    agent_id: '',
    agent_phone: '',
    agent_end: '',
    reg_adr: '',
    reg_scope: '',
    legal_name: '',
    legal_id: '',
    legal_phone: '',
    legal_end: '',
    org_no: ''
  },
  khqx_bbxx: {
    tableColumn: [
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
    ],
    tableData: [],
    listLoading: true
  }
})
