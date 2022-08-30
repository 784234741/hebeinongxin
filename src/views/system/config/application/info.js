
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置

// 表单
export const config = (that) => ({
  // search_value: {
  //   component: 'input-search',
  //   label: 'search',
  //   colSpan: 8,
  //   name: 'search_value',
  //   componentProps: {
  //     // input组件配置
  //     placehodler: '请输入内容',
  //     clearable: true,
  //     querySearch(queryString, cb) {
  //       const restaurants = that.restaurants
  //       const results = queryString
  //         ? restaurants.filter((item) => {
  //           return item.value.indexOf(queryString) !== -1
  //         })
  //         : restaurants
  //       // 调用 callback 返回建议列表的数据
  //       cb(results)
  //     },
  //     handSelect(dd) {
  //       console.log('dd', dd)
  //     }

  //   }
  // },
  organ_no: {
    component: 'select-tree',
    label: '所属机构',
    colSpan: 8,
    name: 'organ_no',
    componentProps: {
      // input组件配置
      clearable: true
    },
    options: []
  },

  ser_type: {
    component: 'select',
    label: '服务类型',
    colSpan: 8,
    name: 'ser_type',
    config: {},
    componentProps: {
      placehodler: '请选择',
      clearable: true
    },
    options: dictionaryFieds('SERVER_TYPE')
  }
})
