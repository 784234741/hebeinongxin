import { v1 as uuidv1 } from 'uuid'
import { dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'ser_name',
    label: '服务名称',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'ser_ip',
    label: '服务ip',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'ser_port',
    label: '服务端口',
    id: uuidv1()
  },
  {
    name: 'ser_content',
    label: '访问目录',
    width: 80,
    id: uuidv1()
  },
  {
    name: 'ser_type',
    label: '服务类型',
    width: 80,
    id: uuidv1()
  },
  {
    name: 'irp_type',
    label: '识别方式',
    width: 80,
    id: uuidv1()
  },
  {
    name: 'thread_num',
    label: '识别线程数',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'is_open',
    label: '启用标志',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '所属机构',
    width: 160,
    id: uuidv1()
  },
  {
    name: 'last_modi_date',
    label: '最后修改日期',
    width: 160,
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that) => ({
  organ_no: {
    component: 'select-tree',
    label: '所属机构',
    colSpan: 12,
    name: 'organ_no',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '所属机构为必输' }]
    },
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: that.$store.getters.organTree
  },
  ser_id: {
    component: 'input',
    label: '服务id',
    colSpan: 12,
    name: 'ser_id',
    config: {
      // form-item 配置
    },
    componentProps: {
      // input组件配置
      placehodler: '后台自动生成',
      clearable: true,
      disabled: true
    }
  },

  ser_name: {
    component: 'input',
    label: '服务名称',
    colSpan: 12,
    name: 'ser_name',
    config: {
      // form-item 配置
      rules: [
        { required: true, message: '服务名称为必输' }
      ]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true
    }
  },

  ser_ip: {
    component: 'input',
    label: '服务ip',
    colSpan: 12,
    name: 'ser_ip',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '服务ip不能为空' }]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true
    }
  },
  ser_port: {
    component: 'input',
    label: '服务端口',
    colSpan: 12,
    name: 'ser_port',
    config: {
      // form-item 配置
      rules: [
        { required: true, message: '服务端口不能为空' },
        { pattern: /^\d+$|^\d+[.]?\d+$/, message: '请输入数字' }
      ]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true
    }
  },
  ser_content: {
    component: 'input',
    label: '访问目录',
    colSpan: 12,
    name: 'ser_content',
    config: {
      // form-item 配置
      rules: [{ required: true, message: '访问目录不能为空' }]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true
    }
  },
  ser_type: {
    component: 'select',
    label: '服务类型',
    colSpan: 12,
    name: 'ser_type',
    config: {
      rules: [{ required: true, message: '服务类型为必选' }]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('SERVER_TYPE')
  },
  is_open: {
    component: 'select',
    label: '启用标志',
    colSpan: 12,
    name: 'is_open',
    config: {
      rules: [{ required: true, message: '启用标志为必选' }]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true
    },
    options: dictionaryFieds('IS_OPEN')
  }
})
