import { v1 as uuidv1 } from 'uuid'
// 表头
export const configTable = (that) => [
  {
    name: 'rn',
    label: '序号',
    width: 50,
    id: uuidv1()
  },
  {
    name: 'organ_no',
    label: '机构',
    id: uuidv1()
  },
  {
    name: 'create_year',
    label: '考核年份',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'score_no',
    label: '分数',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'score_level',
    label: '等级',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'create_date',
    label: '日期',
    width: 100,
    id: uuidv1()
  },
  {
    name: 'detail',
    label: '详情',
    width: 80,
    id: uuidv1()
  }
]

// 新增、修改弹出框表单
export const config = (that) => ({
  acc_no: {
    component: 'select-tree',
    label: '机构号',
    colSpan: 12,
    name: 'organ_no',
    config: {
      // form-item 配置
      rules: [
        { required: true, message: '机构号为必输' },
        { pattern: /^[^!w|!.|!\\]+$/, message: '不允许输入特殊字符' }
      ]
    },
    componentProps: {
      // input组件配置
      placehodler: '',
      clearable: true,
      filterable: true,
      keydown(e) {
        that.nextFocus(e)
      }
    },
    options: that.$store.getters.organTree
  },
  create_year: {
    component: 'date-picker',
    label: '考核年份',
    colSpan: 12,
    name: 'create_year',
    config: {
      // form-item 配置
      rules: []
    },
    componentProps: {
      type: 'year',
      keydown(e) {
        that.nextFocus(e)
      }
    }
  }
})

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
