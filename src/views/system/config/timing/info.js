import { dictionaryFieds } from '@/utils/dictionary'
// 表单
export const config = (that) => ({
  job_key: {
    component: 'input',
    label: '服务id',
    colSpan: 8,
    name: 'job_key',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      placehodler: '支持模糊查询',
      clearable: true
    }
  },
  job_name: {
    component: 'input',
    label: '服务名称',
    colSpan: 8,
    name: 'job_name',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      placehodler: '支持模糊查询',
      clearable: true
    }
  },
  cron_expression: {
    component: 'input',
    label: 'cron表达式',
    colSpan: 8,
    name: 'cron_expression',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      placehodler: '支持模糊查询',
      clearable: true
    }
  },
  job_status: {
    component: 'select',
    label: '运行状态',
    colSpan: 8,
    name: 'job_status',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: [
      { value: '0', label: '暂停中' },
      { value: '1', label: '运行中' }
    ]
  },
  job_server: {
    component: 'select',
    label: '应用服务id',
    colSpan: 8,
    name: 'job_server',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },
  service_module: {
    component: 'select',
    label: '服务模块',
    colSpan: 8,
    name: 'service_module',
    config: {},
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: dictionaryFieds('SERVICE_MODULE')
  }
})
