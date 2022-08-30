import { dictionaryFieds, home_show } from '@/utils/dictionary' // 字典配置
import { commonBlank } from '@/utils/common' // 字典配置

// 路由名称数据过滤
let results = []
function createStateFilter(queryString) {
  return (state) => {
    return (state.value.toLowerCase() === queryString.toLowerCase())
  }
}
// // 菜单名称校验
// const validateName = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('菜单英文名称必输'))
//   }
//   if (results.length > 0) {
//     console.log('resultsAll：', resultsAll)
//     for (const key of resultsAll) {
//       if (key.value.toLowerCase() === value.toLowerCase()) {
//         callback(new Error('菜单英文名称唯一'))
//       }
//     }
//     const reg = /^[A-Za-z]+$/
//     if (!reg.test(value)) {
//       callback(new Error('菜单英文名称必须为字母'))
//     }
//   } else {
//     callback()
//   }
// }

// 表单
export const config = (that) => ({
  menu_name: {
    component: 'input',
    label: '菜单中文名称',
    name: 'menu_name',
    config: { // form-item 配置
      rules: [
        { required: true, message: '菜单名称为必选' }
      ]
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true
    }
  },
  name: {
    component: 'input-search',
    label: '菜单英文名称',
    name: 'name',
    config: { // form-item 配置
      rules: [
        { required: true, validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('菜单英文名称必输'))
          }
          if (results.length > 0) {
            for (const key of that.resultsAll) {
              if (key.value.toLowerCase() === value.toLowerCase()) {
                if (that.operator === 'modify' && that.currentData.name.toLowerCase() === value.toLowerCase()) { // 修改时 排除原有name值
                } else {
                  callback(new Error(`菜单英文名称唯一, ${value}已存在!`))
                }
              }
            }
          } else {
            callback()
          }
        }
        },
        { pattern: /^[A-Za-z]*$/, message: '菜单英文名称必须为字母' }
        // { validator: validateName }
      ]
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true,
      querySearch: (queryString, cb) => {
        results = !commonBlank(queryString) ? that.resultsAll.filter(createStateFilter(queryString)) : that.resultsAll
        // clearTimeout(that.timeout)
        // that.timeout = setTimeout(() => {
        cb(results)
        // }, 100)
      }
    }
  },
  path: {
    component: 'input',
    label: '菜单路径',
    name: 'path',
    config: { // form-item 配置
      rules: [
        { required: true, message: '菜单路径为必选' }
      ]
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true
    }
  },
  menu_class: {
    component: 'select',
    label: '菜单图标',
    name: 'menu_class',
    config: {
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: []
  },
  menu_type: {
    component: 'select',
    label: '菜单分类',
    name: 'menu_type',
    config: { // form-item 配置
      rules: [
        { required: true, message: '菜单路径为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: dictionaryFieds('MENU_TYPE')
  },
  home_show: {
    component: 'select',
    label: '显示方式',
    name: 'home_show',
    config: { // form-item 配置
      rules: [
        { required: true, message: '显示方式为必选' }
      ]
    },
    componentProps: {
      placehodler: '请选择',
      filterable: true,
      clearable: true
    },
    options: home_show
  },
  menu_desc: {
    component: 'input',
    label: '菜单描述',
    name: 'menu_desc',
    config: { // form-item 配置
    },
    componentProps: { // input组件配置
      placehodler: '',
      clearable: true
    }
  }
})
