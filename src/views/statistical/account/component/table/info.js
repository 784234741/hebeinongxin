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
    name: 'thismonth_visit_bank_num',
    label: '银行家数',
    id: uuidv1()
  },
  {
    name: 'thismonth_visit_network_num',
    label: '网点数',
    id: uuidv1()
  },
  {
    name: 'thismonth_visit_result_num',
    label: '存在问题网点数',
    id: uuidv1()
  },
  {
    name: 'tothismonth_visit_bank_num',
    label: '银行家数',
    id: uuidv1()
  },
  {
    name: 'tothismonth_visit_network_num',
    label: '网点数',
    id: uuidv1()
  },
  {
    name: 'tothismonth_visit_result_num',
    label: '存在问题网点数',
    id: uuidv1()
  },
  {
    name: 'notice_person',
    label: '通报人员（人）',
    id: uuidv1()
  },
  {
    name: 'notice_network',
    label: '通报网点（个）',
    id: uuidv1()
  },
  {
    name: 'reduce_performance',
    label: '扣减绩效（人次）',
    id: uuidv1()
  },
  {
    name: 'adjust_position',
    label: '调整职务（人次）',
    id: uuidv1()
  },
  {
    name: 'remove_position',
    label: '解除职务（人次）',
    id: uuidv1()
  },
  {
    name: 'interview_network',
    label: '约谈网点',
    id: uuidv1()
  },
  {
    name: 'punish_network',
    label: '处罚网点',
    id: uuidv1()
  },
  {
    name: 'punish_cash',
    label: '处罚金额(万元)',
    id: uuidv1()
  },
  {
    name: 'publish_negative_bank_num',
    label: '银行家数',
    id: uuidv1()
  },
  {
    name: 'publish_negative_network_num',
    label: '网点数',
    id: uuidv1()
  },
  {
    name: 'publish_tel_bank_num',
    label: '银行家数',
    id: uuidv1()
  },
  {
    name: 'publish_tel_network_num',
    label: '网点数',
    id: uuidv1()
  },
  {
    name: 'company_publish_three_bank_num',
    label: '银行家数',
    id: uuidv1()
  },
  {
    name: 'company_publish_three_network_num',
    label: '网点数',
    id: uuidv1()
  },
  {
    name: 'person_publish_three_bank_num',
    label: '银行家数',
    id: uuidv1()
  },
  {
    name: 'person_publish_three_network_num',
    label: '网点数',
    id: uuidv1()
  },
  {
    name: 'acc_bank_no',
    label: '地方性银行',
    id: uuidv1()
  },
  {
    name: 'dis_bank_no',
    label: '地方性银行',
    id: uuidv1()
  }
]
// 新增弹出框表单
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
      title: '本月抽查暗访银行数量',
      labelWidth: '20rem',
      data: {
        thismonth_visit_bank_num: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'thismonth_visit_bank_num',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        thismonth_visit_network_num: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'thismonth_visit_network_num',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
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
        thismonth_visit_bank_num: '',
        thismonth_visit_network_num: ''
      }
    },
    form_info3: {
      title: '本月抽查暗访结果',
      labelWidth: '20rem',
      data: {
        thismonth_visit_result_num: {
          component: 'input',
          label: '本月抽查暗访存在问题网点数',
          colSpan: 8,
          name: 'thismonth_visit_result_num',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
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
        thismonth_visit_result_num: ''
      }
    },
    form_info4: {
      title: '本年1月至本月抽查暗访银行数量',
      labelWidth: '20rem',
      data: {
        tothismonth_visit_bank_num: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'tothismonth_visit_bank_num',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        tothismonth_visit_network_num: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'tothismonth_visit_network_num',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
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
        tothismonth_visit_bank_num: '',
        tothismonth_visit_network_num: ''
      }
    },
    form_info5: {
      title: '本年1月至本月抽查暗访结果',
      labelWidth: '20rem',
      data: {
        tothismonth_visit_result_num: {
          component: 'input',
          label: '本月抽查暗访存在问题网点数',
          colSpan: 8,
          name: 'tothismonth_visit_result_num',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
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
        tothismonth_visit_result_num: ''
      }
    },
    form_info6: {
      title: '账户服务相关问责情况',
      labelWidth: '20rem',
      data: {
        notice_person: {
          component: 'input',
          label: '通报人员（人）',
          colSpan: 8,
          name: 'notice_person',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        notice_network: {
          component: 'input',
          label: '通报网点（个）',
          colSpan: 8,
          name: 'notice_network',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        reduce_performance: {
          component: 'input',
          label: '扣减绩效（人次）',
          colSpan: 8,
          name: 'reduce_performance',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        adjust_position: {
          component: 'input',
          label: '调整职务（人次）',
          colSpan: 8,
          name: 'adjust_position',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        remove_position: {
          component: 'input',
          label: '解除职务（人次）',
          colSpan: 8,
          name: 'remove_position',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        interview_network: {
          component: 'input',
          label: '人民银行问责-约谈网点',
          colSpan: 8,
          name: 'interview_network',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        punish_network: {
          component: 'input',
          label: '人民银行问责-处罚网点',
          colSpan: 8,
          name: 'punish_network',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
          },
          componentProps: {
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        punish_cash: {
          component: 'input',
          label: '人民银行问责-处罚金额(万元)',
          colSpan: 8,
          name: 'punish_cash',
          config: {
            rules: [
              { required: true, message: '此处不能为空', trigger: 'blur' }
            ]
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
        notice_person: '',
        notice_network: '',
        reduce_performance: '',
        adjust_position: '',
        remove_position: '',
        interview_network: '',
        punish_network: '',
        punish_cash: ''
      }
    },
    form_info7: {
      title: '负面清单公示情况',
      labelWidth: '20rem',
      data: {
        publish_negative_bank_num: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'publish_negative_bank_num',
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
        publish_negative_network_num: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'publish_negative_network_num',
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
        publish_negative_bank_num: '',
        publish_negative_network_num: ''
      }
    },
    form_info8: {
      title: '公示服务监督电话',
      labelWidth: '20rem',
      data: {
        publish_tel_bank_num: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'publish_tel_bank_num',
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
        publish_tel_network_num: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'publish_tel_network_num',
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
        publish_tel_bank_num: '',
        publish_tel_network_num: ''
      }
    },
    form_info9: {
      title: '企业账户服务“三公开”公示情况',
      labelWidth: '20rem',
      data: {
        company_publish_three_bank_num: {
          component: 'input',
          label: '”银行家数',
          colSpan: 8,
          name: 'company_publish_three_bank_num',
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
        company_publish_three_network: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'company_publish_three_network',
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
        company_publish_three_bank_num: '',
        company_publish_three_network: ''
      }
    },
    form_info10: {
      title: '个人账户服务“三公开”公示情况',
      labelWidth: '20rem',
      data: {
        person_publish_three_bank_num: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'person_publish_three_bank_num',
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
        person_publish_three_network: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'person_publish_three_network',
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
        person_publish_three_bank_num: '',
        person_publish_three_network: ''
      }
    },
    form_info11: {
      title: '账户服务和风险防控同时纳入网点和员工业绩考核银行家数',
      labelWidth: '20rem',
      data: {
        acc_bank_no: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'acc_bank_no',
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
        acc_bank_no: ''
      }
    },
    form_info12: {
      title: '取消个人开户数量和非柜面业务签约量考核银行家数',
      labelWidth: '20rem',
      data: {
        dis_bank_no: {
          component: 'input',
          label: '”银行家数',
          colSpan: 8,
          name: 'dis_bank_no',
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
        dis_bank_no: ''
      }
    }
  }
}
