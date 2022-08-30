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
    name: 'thismonth_complain_people',
    label: '人民银行受理',
    id: uuidv1()
  },
  {
    name: 'thismonth_complain_bank',
    label: '银行受理',
    id: uuidv1()
  },
  {
    name: 'tothismonth_complain_people',
    label: '人民银行受理',
    id: uuidv1()
  },
  {
    name: 'tothismonth_complain_bank',
    label: '银行受理',
    id: uuidv1()
  },
  {
    name: 'recover_num_of_ques',
    label: '收回有效调查问卷份数',
    id: uuidv1()
  },
  {
    name: 'very_satisfied_num',
    label: '其中：非常满意的份数',
    id: uuidv1()
  },
  {
    name: 'quite_satisfied_num',
    label: '其中：比较满意的份数',
    id: uuidv1()
  },
  {
    name: 'satisfied_num',
    label: '其中：满意的份数',
    id: uuidv1()
  },
  {
    name: 'dissatisfied_num',
    label: '其中：不满意的份数',
    id: uuidv1()
  },
  {
    name: 'very_dissatisfied_num',
    label: '其中：非常不满意的份数',
    id: uuidv1()
  },
  {
    name: 'open_manage_fee',
    label: '开户管理费',
    id: uuidv1()
  },
  {
    name: 'year_fee',
    label: '年费',
    id: uuidv1()
  },
  {
    name: 'online_open_fee',
    label: '网银开通费',
    id: uuidv1()
  },
  {
    name: 'other_manage_fee',
    label: '其他与账户相关管理费',
    id: uuidv1()
  },
  {
    name: 'total_fee',
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
        thismonth_complain_people: {
          component: 'input',
          label: '人民银行受理',
          colSpan: 8,
          name: 'thismonth_complain_people',
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
        thismonth_complain_bank: {
          component: 'input',
          label: '银行受理',
          colSpan: 8,
          name: 'thismonth_complain_bank',
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
        thismonth_complain_people: '',
        thismonth_complain_bank: ''
      }
    },
    form_info3: {
      title: '本年1月至本月开户投诉（单位：起）',
      labelWidth: '20rem',
      data: {
        tothismonth_complain_people: {
          component: 'input',
          label: '人民银行受理',
          colSpan: 8,
          name: 'tothismonth_complain_people',
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
        tothismonth_complain_bank: {
          component: 'input',
          label: '银行受理',
          colSpan: 8,
          name: 'tothismonth_complain_bank',
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
        tothismonth_complain_people: '',
        tothismonth_complain_bank: ''
      }
    },
    form_info4: {
      title: '本年1月至本月开户服务满意度调查）',
      labelWidth: '20rem',
      data: {
        very_satisfied_num: {
          component: 'input',
          label: '问卷结果-其中：非常满意的份数',
          colSpan: 8,
          name: 'very_satisfied_num',
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
        quite_satisfied_num: {
          component: 'input',
          label: '问卷结果-其中：比较满意的份数',
          colSpan: 8,
          name: 'quite_satisfied_num',
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
        satisfied_num: {
          component: 'input',
          label: '问卷结果-其中：满意的份数',
          colSpan: 8,
          name: 'satisfied_num',
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
        dissatisfied_num: {
          component: 'input',
          label: '问卷结果-其中：不满意的份数',
          colSpan: 8,
          name: 'dissatisfied_num',
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
        very_dissatisfied_num: {
          component: 'input',
          label: '问卷结果-其中：非常不满意的份数',
          colSpan: 8,
          name: 'very_dissatisfied_num',
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
        very_satisfied_num: '',
        quite_satisfied_num: '',
        satisfied_num: '',
        dissatisfied_num: '',
        very_dissatisfied_num: ''
      }
    },
    form_info5: {
      title: '本年1月至本月累计减免费用（单位万元）',
      labelWidth: '20rem',
      data: {
        open_manage_fee: {
          component: 'input',
          label: '开户管理费',
          colSpan: 8,
          name: 'open_manage_fee',
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
        year_fee: {
          component: 'input',
          label: '年费',
          colSpan: 8,
          name: 'year_fee',
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
        online_open_fee: {
          component: 'input',
          label: '网银开通费',
          colSpan: 8,
          name: 'online_open_fee',
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
        other_manage_fee: {
          component: 'input',
          label: '其他与账户相关管理费',
          colSpan: 8,
          name: 'other_manage_fee',
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
        open_manage_fee: '',
        year_fee: '',
        online_open_fee: '',
        other_manage_fee: ''
      }
    }
  }
}
