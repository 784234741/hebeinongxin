import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary'
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'job_server',
    label: '服务ID',
    width: 180,
    id: uuidv1()
  },
  {
    name: 'service_module',
    label: '服务模块',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'job_name',
    label: '服务名称',
    width: 140,
    id: uuidv1()
  },
  {
    name: 'cron_expression',
    label: '触发规则',
    width: 140,
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '发布时间',
    // width: 150,
    id: uuidv1()
  },
  {
    name: 'job_status',
    label: '运行状态',
    width: 80,
    id: uuidv1()
  },
  {
    name: 'operator',
    label: '操作',
    // width: 80,
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that, check = false) => ({
  job_key: {
    component: 'input',
    label: '定时服务ID',
    colSpan: 22,
    name: 'job_key',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      placehodler: '自动生成',
      disabled: true
    }
  },
  job_name: {
    component: 'input',
    label: '服务名称',
    colSpan: 22,
    name: 'job_name',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '此处不能为空' }]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true,
      disabled: check
    }
  },

  job_server: {
    component: 'select',
    label: '应用服务器ID',
    colSpan: 22,
    name: 'job_server',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '此处不能为空' }]
    },
    componentProps: {
      // input组件配置
      // placehodler: '可多选',
      // multiple: true
      clearable: true,
      disabled: check
    },
    options: that.$store.getters.externalData.SERVER_ID
  },

  job_type: {
    component: 'select',
    label: '服务类型',
    colSpan: 22,
    name: 'job_type',
    config: {
      // form-item 配置
      rules: []
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true,
      disabled: check
    },
    options: dictionaryFieds('SCHEDULE_JOB_TYPE')
  },
  service_module: {
    component: 'select',
    label: '服务模块',
    colSpan: 22,
    name: 'service_module',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '此处不能为空' }]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true,
      disabled: check
    },
    options: dictionaryFieds('SERVICE_MODULE')
  },
  job_class_name: {
    component: 'input',
    label: '实现类名',
    colSpan: 22,
    name: 'job_class_name',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '此处不能为空' }]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true,
      disabled: check
    }
  },
  cron_expression: {
    component: 'input',
    label: 'cron表达式',
    colSpan: 22,
    name: 'cron_expression',
    config: {
      rules: [{ required: true, message: '此处不能为空' }]
    },
    componentProps: {
      clearable: true,
      disabled: check
    }
  },
  job_desc: {
    component: 'input',
    label: '服务描述',
    colSpan: 22,
    name: 'job_desc',
    config: {},
    componentProps: {
      type: 'textarea',
      clearable: true,
      disabled: check
    }
  }
})
