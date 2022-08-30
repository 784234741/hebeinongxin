import { constantRoutes } from '@/router'
import { RouterRequest } from '@/api'
import { commonBlank } from '@/utils/common'
import Layout from '@/layout'
const { menu } = RouterRequest

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []
  for (const route of routes) {
    const newItem = { ...route }
    newItem['props'] = { ...route } // 配置路由参数
    if (newItem.home_show === '2') {
      // 仅在首页显示，不初始化在路由中
      continue
    }
    if (newItem.index) {
      // 一级菜单 component配置
      if (newItem.index === '0') {
        route.component = '/Layout'
        newItem.component = '/Layout'
        if (newItem.alwaysshow) {
          delete newItem.alwaysshow
          newItem.alwaysShow = true
        }
      }
    } else {
      route.component = route.path // 赋值path给component
    }
    if (route.meta.icon === '') {
      route.meta.icon = ' '
    }
    if (!route.meta.module_no) {
      route.meta.module_no = route.menu_id
    }
    if (route.component) {
      if (route.component === '/Layout') {
        newItem.component = Layout
      } else {
        newItem.component = () =>
          Promise.resolve(require(`@/views/${route.component}`).default)
      }
    } else {
      continue
    }
    if (newItem.children && newItem.children.length) {
      newItem.children = filterAsyncRoutes(route.children)
    }
    res.push(newItem)
  }
  // routes.forEach(route => {
  //   const newItem = { ...route }
  //   newItem.name = route.menu_name
  //   if (newItem.component) {
  //     if (newItem.component === '/Layout') {
  //       newItem.component = Layout
  //     } else {
  //       newItem.component = () => Promise.resolve(require(`@/views/${route.component}`).default)
  //     }
  //   }
  //   if (newItem.children && newItem.children.length) {
  //     newItem.children = filterAsyncRoutes(route.children)
  //   }
  //   res.push(newItem)
  // })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit, dispatch, state }, param) {
    return new Promise((resolve, reject) => {
      // 获取左侧菜单
      let accessedRoutes = []
      const msg = {
        oper_type: '0',
        isPC: true
      }
      menu(msg)
        .then((response) => {
          // 菜单请求
          let { returnList } = response.retMap
          if (commonBlank(returnList)) {
            returnList = []
          }
          let returnListData = []
          for (const item of returnList) {
            returnListData = [...returnListData, { index: '0', ...item }]
          }
          accessedRoutes = filterAsyncRoutes(returnListData) // 配置动态路由
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
