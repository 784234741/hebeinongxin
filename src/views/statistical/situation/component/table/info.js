// 表头
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
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
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
      title: '实现对非柜面额度采取不同级别管控情况',
      labelWidth: '20rem',
      data: {
        non_cou_con_bank: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'non_cou_con_bank',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        non_cou_con_site: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'non_cou_con_site',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        non_cou_con_bank: '',
        non_cou_con_site: ''
      }
    },
    form_info3: {
      title: '实现手机银行可疑交易人脸识别情况',
      labelWidth: '20rem',
      data: {
        mob_sus_face_bank: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'mob_sus_face_bank',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        mob_sus_face_site: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'mob_sus_face_site',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        mob_sus_face_bank: '',
        mob_sus_face_site: ''
      }
    },
    form_info4: {
      title: '实现网上银行可疑交易人脸识别情况',
      labelWidth: '20rem',
      data: {
        online_sus_fac_bank: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'online_sus_fac_bank',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        online_sus_fac_site: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'online_sus_fac_site',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        online_sus_fac_bank: '',
        online_sus_fac_site: ''
      }
    },
    form_info5: {
      title: '电子营业执照在企业开户环节的应用',
      labelWidth: '20rem',
      data: {
        ele_bus_open_acc_bank: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'ele_bus_open_acc_bank',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        ele_bus_open_acc_site: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'ele_bus_open_acc_site',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        ele_bus_open_acc_opac: {
          component: 'input',
          label: '累计开户数(户)',
          colSpan: 8,
          name: 'ele_bus_open_acc_opac',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        ele_bus_open_acc_bank: '',
        ele_bus_open_acc_site: '',
        ele_bus_open_acc_opac: ''
      }
    },
    form_info6: {
      title: '电子印章在企业开户环节的应用',
      labelWidth: '20rem',
      data: {
        ele_seal_open_acc_bank: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'ele_seal_open_acc_bank',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        ele_seal_open_acc_site: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'ele_seal_open_acc_site',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        ele_seal_open_acc_opac: {
          component: 'input',
          label: '累计开户数(户)',
          colSpan: 8,
          name: 'ele_seal_open_acc_opac',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        ele_seal_open_acc_bank: '',
        ele_seal_open_acc_site: '',
        ele_seal_open_acc_opac: ''
      }
    },
    form_info7: {
      title: '市场监管部门企业注册登记受理终端机具在银行网点布放情况',
      labelWidth: '20rem',
      data: {
        ent_reg_term_dep_bank: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'ent_reg_term_dep_bank',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        ent_reg_term_dep_site: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'ent_reg_term_dep_site',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        ent_reg_term_dep_opac: {
          component: 'input',
          label: '累计开户数(户)',
          colSpan: 8,
          name: 'ent_reg_term_dep_opac',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        ent_reg_term_dep_bank: '',
        ent_reg_term_dep_site: '',
        ent_reg_term_dep_opac: ''
      }
    },
    form_info8: {
      title: '建立延长开户时间和拒绝开户复核机制',
      labelWidth: '20rem',
      data: {
        pro_ope_ref_rev_bank: {
          component: 'input',
          label: '银行家数',
          colSpan: 8,
          name: 'pro_ope_ref_rev_bank',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        pro_ope_ref_rev_site: {
          component: 'input',
          label: '网点数',
          colSpan: 8,
          name: 'pro_ope_ref_rev_site',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        pro_ope_ref_rev_bank: '',
        pro_ope_ref_rev_site: ''
      }
    },
    form_info9: {
      title: '本月延长开户时间复核',
      labelWidth: '20rem',
      data: {
        mon_ext_ope_acc_a: {
          component: 'input',
          label: '账户数',
          colSpan: 8,
          name: 'mon_ext_ope_acc_a',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        mon_ext_ope_acc_r: {
          component: 'input',
          label: '本复核后不延长账户数',
          colSpan: 8,
          name: 'mon_ext_ope_acc_r',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        mon_ext_ope_acc_a: '',
        mon_ext_ope_acc_r: ''
      }
    },
    form_info10: {
      title: '本年1月至本月延长开户时间复核',
      labelWidth: '20rem',
      data: {
        year_ext_ope_acc_a: {
          component: 'input',
          label: '账户数',
          colSpan: 8,
          name: 'year_ext_ope_acc_a',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        year_ext_ope_acc_r: {
          component: 'input',
          label: '本复核后不延长账户数',
          colSpan: 8,
          name: 'year_ext_ope_acc_r',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        year_ext_ope_acc_r: '',
        year_ext_ope_acc_a: ''
      }
    },
    form_info11: {
      title: '本月拒绝开户复核',
      labelWidth: '20rem',
      data: {
        mon_ref_open_rev_a: {
          component: 'input',
          label: '账户数',
          colSpan: 8,
          name: 'mon_ref_open_rev_a',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        mon_ref_open_rev_r: {
          component: 'input',
          label: '本复核后不延长账户数',
          colSpan: 8,
          name: 'mon_ref_open_rev_r',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        mon_ref_open_rev_a: '',
        mon_ref_open_rev_r: ''
      }
    },
    form_info12: {
      title: '本年1月至本月拒绝开户复核',
      labelWidth: '20rem',
      data: {
        year_ref_open_rev_a: {
          component: 'input',
          label: '账户数',
          colSpan: 8,
          name: 'year_ref_open_rev_a',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        },
        year_ref_open_rev_r: {
          component: 'input',
          label: '本复核后不延长账户数',
          colSpan: 8,
          name: 'year_ref_open_rev_r',
          config: {
            // form-item 配置
            rules: [{ required: true, message: '此处不能为空' }]
          },
          componentProps: {
            // input组件配置
            placehodler: '',
            clearable: true,
            keydown(e) {
              that.nextFocus(e)
            }
          }
        }
      },
      formData: {
        year_ref_open_rev_a: '',
        year_ref_open_rev_r: ''
      }
    }
  }
}
