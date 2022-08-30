import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'organ_no',
    label: '填报机构',
    id: uuidv1()
  },
  {
    name: 'count_month',
    label: '统计月份',
    id: uuidv1()
  },
  {
    name: 'mon_comp_peo_bank',
    label: '人民银行受理',
    id: uuidv1()
  },
  {
    name: 'mon_comp_bank',
    label: '银行受理',
    id: uuidv1()
  },
  {
    name: 'year_comp_peo_bank',
    label: '人民银行受理',
    id: uuidv1()
  },
  {
    name: 'year_comp_bank',
    label: '银行受理',
    id: uuidv1()
  },
  {
    name: 'question_num',
    label: '收回有效调查问卷份数',
    id: uuidv1()
  },
  {
    name: 'great_satis',
    label: '其中：非常满意的份数',
    id: uuidv1()
  },
  {
    name: 'be_quite_satis',
    label: '其中：比较满意的份数',
    id: uuidv1()
  },
  {
    name: 'satisfied',
    label: '其中：满意的份数',
    id: uuidv1()
  },
  {
    name: 'dissatisfied',
    label: '其中：不满意的份数',
    id: uuidv1()
  },
  {
    name: 'be_very_dissatis',
    label: '其中：非常不满意的份数',
    id: uuidv1()
  },
  {
    name: 'acc_open_man',
    label: '开户管理费',
    id: uuidv1()
  },
  {
    name: 'annual_fee',
    label: '年费',
    id: uuidv1()
  },
  {
    name: 'e_bank_open_fee',
    label: '网银开通费',
    id: uuidv1()
  },
  {
    name: 'other_management',
    label: '其他与账户相关管理费',
    id: uuidv1()
  },
  {
    name: 'total',
    label: '合计',
    id: uuidv1()
  }
]
// 新增、修改弹出框表单
export const config = (that) => {
  return {
    form_info1: {
      title: '',
      labelWidth: '20rem',
      data: {
        count_month: {
          component: 'date-picker',
          label: '统计月份',
          colSpan: 8,
          name: 'count_month',
          config: {},
          componentProps: {
            // input组件配置
            clearable: true,
            type: 'month',
            valueFormat: 'yyyy-MM',
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        count_month: ''
      }
    },
    form_info2: {
      title: '本月开户投诉（单位：起）',
      labelWidth: '20rem',
      data: {
        mon_comp_peo_bank: {
          component: 'input',
          label: '人民银行受理',
          colSpan: 8,
          name: 'mon_comp_peo_bank',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        mon_comp_bank: {
          component: 'input',
          label: '银行受理',
          colSpan: 8,
          name: 'mon_comp_bank',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        mon_comp_peo_bank: '',
        mon_comp_bank: ''
      }
    },
    form_info3: {
      title: '本年1月至本月开户投诉（单位：起）',
      labelWidth: '20rem',
      data: {
        year_comp_peo_bank: {
          component: 'input',
          label: '人民银行受理',
          colSpan: 8,
          name: 'year_comp_peo_bank',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        year_comp_bank: {
          component: 'input',
          label: '银行受理',
          colSpan: 8,
          name: 'year_comp_bank',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        year_comp_peo_bank: '',
        year_comp_bank: ''
      }
    },
    form_info4: {
      title: '本年1月至本月开户服务满意度调查）',
      labelWidth: '20rem',
      data: {
        great_satis: {
          component: 'input',
          label: '问卷结果-其中：非常满意的份数',
          colSpan: 8,
          name: 'great_satis',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        be_quite_satis: {
          component: 'input',
          label: '问卷结果-其中：比较满意的份数',
          colSpan: 8,
          name: 'be_quite_satis',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        satisfied: {
          component: 'input',
          label: '问卷结果-其中：满意的份数',
          colSpan: 8,
          name: 'satisfied',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        dissatisfied: {
          component: 'input',
          label: '问卷结果-其中：不满意的份数',
          colSpan: 8,
          name: 'dissatisfied',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        be_very_dissatis: {
          component: 'input',
          label: '问卷结果-其中：非常不满意的份数',
          colSpan: 8,
          name: 'be_very_dissatis',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        great_satis: '',
        be_quite_satis: '',
        satisfied: '',
        dissatisfied: '',
        be_very_dissatis: ''
      }
    },
    form_info5: {
      title: '本年1月至本月累计减免费用（单位万元）',
      labelWidth: '20rem',
      data: {
        acc_open_man: {
          component: 'input',
          label: '开户管理费',
          colSpan: 8,
          name: 'acc_open_man',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        annual_fee: {
          component: 'input',
          label: '年费',
          colSpan: 8,
          name: 'annual_fee',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        e_bank_open_fee: {
          component: 'input',
          label: '网银开通费',
          colSpan: 8,
          name: 'e_bank_open_fee',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        other_management: {
          component: 'input',
          label: '其他与账户相关管理费',
          colSpan: 8,
          name: 'other_management',
          config: {
            rules: [{ required: true, message: '此处不能为空', trigger: 'blur' }]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        acc_open_man: '',
        annual_fee: '',
        e_bank_open_fee: '',
        other_management: ''
      }
    }
  }
}
