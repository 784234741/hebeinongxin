import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters' // 用于将state中的数据进行加工

Vue.use(Vuex)
// 会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块
const modulesFiles = require.context('./modules', true, /\.js$/)

// 你不需要' import app from './modules/app'
// 它将自动要求所有vuex模块从模块文件引入
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules, // 模块管理
  getters
})

export default store
