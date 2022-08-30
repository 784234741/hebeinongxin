import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取token
import defaultSettings from '@/settings'

import errorRouter from '@/router/modules/error.js' // 404等路由

NProgress.configure({ showSpinner: false }) // 进度条 配置

const whiteList = ['/login', '/error'] // 没有重定向白名单 , 访问拦截

// 导航守卫 - “导航”表示路由正在发生改变
router.beforeEach(async(to, from, next) => {
  if (window.location.hash.indexOf('tellerno') !== -1) {
    console.log('免密登录')
  } else {
    // 开始进度条
    NProgress.start()

    // 设置页面标题 begin
    const title = defaultSettings.title
    let titleDoc = title
    if (to.meta.title) {
      titleDoc = `${to.meta.title} - ${title}`
    }
    document.title = titleDoc
    // 设置页面标题 end

    // 判断用户是否已经登录
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next('/')
        NProgress.done() // 进度条结束
      } else {
        // 判断用户是否通过getInfo获得了权限角色
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
          next()
        } else {
          try {
            // 获取用户信息
            // 注意:角色必须是一个对象数组!例如:['admin']或['developer'，'editor']
            const { roles } = await store.dispatch('user/getInfo')

            // 生成基于角色的可访问路由图 - 异步路由
            const accessRoutes = await store.dispatch(
              'permission/generateRoutes',
              { roles: roles, token: hasToken }
            ) // 获取所有路由

            // 动态添加可访问路由
            for (let i = 0, length = accessRoutes.length; i < length; i += 1) {
              const element = accessRoutes[i]
              router.addRoute(element)
            }
            // 添加 404等路由
            for (let j = 0, length = errorRouter.length; j < length; j += 1) {
              const element = errorRouter[j]
              router.addRoute(element)
            }
            // router.addRoute(accessRoutes)
            // router.addRoute(errorRouter)

            // hack方法来确保addroues是完整的
            // 设置 replace: true, 这样导航就不会留下历史记录
            next({ ...to, replace: true })
            store.dispatch('common/commonInit') // 获取机构树
          } catch (error) {
            // 移除token，到登录页面重新登录
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      /* 无 token*/
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        // 其他没有访问权限的页面被重定向到登录页面。
        next(`/login?redirect=${to.path}`)
        NProgress.done() // 关闭进度条
      }
    }
  }
})

// 全局后置钩子
router.afterEach(() => {
  // finish progress bar
  NProgress.done() // 关闭进度条
})
