/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const errorRouter = [
  {
    path: '*',
    component: Layout,
    redirect: '/error-page',
    children: [
      {
        path: '/error-page',
        component: () => import('@/views/error-page/404'),
        name: '404',
        meta: { title: '页面出错', icon: 'dashboard' } // 路由元信息
      }
    ],
    hidden: true
  }
]

export default errorRouter
