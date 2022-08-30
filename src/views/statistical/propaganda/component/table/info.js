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
        },
        trad_media_pub: {
          component: 'input',
          label: '通过广播、电视、报刊传统媒体宣传（次）',
          colSpan: 8,
          name: 'trad_media_pub',
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
        new_media_pub: {
          component: 'input',
          label: '通过官网、微信公众号等新兴媒体宣传（次）',
          colSpan: 8,
          name: 'new_media_pub',
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
        propaganda: {
          component: 'input',
          label: '现场宣传（次)',
          colSpan: 8,
          name: 'propaganda',
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
        other_special_pub: {
          component: 'input',
          label: '通过广播、电视、报刊传统媒体宣传（次）',
          colSpan: 8,
          name: 'other_special_pub',
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
        cover_people: {
          component: 'input',
          label: '覆盖人次（人）',
          colSpan: 8,
          name: 'cover_people',
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
        count_month: '',
        trad_media_pub: '',
        new_media_pub: '',
        propaganda: '',
        other_special_pub: '',
        cover_people: ''
      }
    },
    form_info2: {
      title: '断卡”行动专题宣传(线上)',
      labelWidth: '20rem',
      data: {
        times_one: {
          component: 'input',
          label: '次数',
          colSpan: 8,
          name: 'times_one',
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
        cover_people_one: {
          component: 'input',
          label: '覆盖人次(人)',
          colSpan: 8,
          name: 'cover_people_one',
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
        times_one: '',
        cover_people_one: ''
      }
    },
    form_info3: {
      title: '断卡”行动专题宣传(线下)',
      labelWidth: '20rem',
      data: {
        times_two: {
          component: 'input',
          label: '次数',
          colSpan: 8,
          name: 'times_two',
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
        cover_people_two: {
          component: 'input',
          label: '覆盖人次(人)',
          colSpan: 8,
          name: 'cover_people_two',
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
        times_two: '',
        cover_people_two: ''
      }
    },
    form_info4: {
      title: '优化服务宣传',
      labelWidth: '20rem',
      data: {
        local_publicity: {
          component: 'input',
          label: '在经济园区、孵化器、高校等实地宣传（次）',
          colSpan: 8,
          name: 'local_publicity',
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
        official_publicity: {
          component: 'input',
          label: '官网和微信公众号（篇）',
          colSpan: 8,
          name: 'official_publicity',
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
        media_publicity: {
          component: 'input',
          label: '媒体（篇）',
          colSpan: 8,
          name: 'media_publicity',
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
        local_publicity: '',
        official_publicity: '',
        media_publicity: ''
      }
    }
  }
}
