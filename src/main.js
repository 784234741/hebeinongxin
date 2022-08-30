import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import { MessageBox } from 'element-ui'
// import './assets/scss/common/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import './assets/scss/main.scss' // 全局样式

// import './assets/custom-theme/index.css' // 全局样式

import App from './App'
import store from './store'
import router from './router'

import './assets/img/icons' // 全局icon注册
import './permission' // 路由权限控制

import * as filters from './filters' // 全局过滤器
import Print from '@/utils/print' // 导入打印组件
import { Common } from '@/api'
const { checkUrl } = Common

/**
 *如果你不想使用mock-server
 *你想使用MockJs进行模拟api,可以执行mockXHR()
 *目前MockJs将在生产环境中使用，
 *请在上线前删除!！ ！
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('./mock')
//   mockXHR()
// }

Vue.use(Print) // 打印注册

// 自定义全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
// Vue.use(Sunyard)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// Vue.config是一个对象，包含 Vue 的全局配置
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

// 前端错误捕获 begin
const errorHandler = (error, vm, info) => {
  console.error('error:', error)
  if (info !== 'err') {
    MessageBox.alert('前台报错：' + error, {
      confirmButtonText: '确定'
    })
    // Message({
    //   message: '前台报错：' + error,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
  }
}
Vue.config.errorHandler = errorHandler
// 前端错误捕获 end

// 注册实例
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  },
  created() {
    this.noPasswordLogin()
  },
  methods: {
    // 免密登录
    noPasswordLogin() {
      if (window.location.hash.indexOf('tellerno') !== -1) {
        const location = window.location.hash
        const Arr = location.split('?')[1].split('&')
        const obj = {}
        Arr.forEach((item) => {
          const ssd = item.split('=')
          obj[ssd[0]] = ssd[1]
        })

        const msg = {
          parameterList: [{}],
          oper_type: 'checkUrl',
          ...obj
        }
        checkUrl(msg).then((res) => {
          const {
            retMap: { password }
          } = res
          this.$store
            .dispatch('user/autoLogin', {
              username: obj.tellerno,
              password
            })
            .then((res) => {
              window.location.replace('/')
            })
        })
      }
    }
  },
  render: (h) => h(App)
})
