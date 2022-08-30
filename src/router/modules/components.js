/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components-demo',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children: [
    {
      path: '/components-demo/markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
    {
      path: '/components-demo/treeImage',
      component: () => import('@/views/components-demo/treeImage'),
      name: 'TreeImageDemo',
      meta: { title: 'TreeImage' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: 'SplitPane' }
    },
    // {
    //   path: '/icons',
    //   component: () => import('@/views/icons'),
    //   alwaysShow: true, //
    //   meta: {
    //     title: 'Icons',
    //     icon: 'icon'
    //   },
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/components-demo/icons/index'),
    //       name: 'Icons',
    //       meta: { title: 'Icons', noCache: true }
    //     }
    //   ]
    // },
    {
      path: 'list',
      component: () => import('@/views/components-demo/list/index'),
      name: 'list',
      meta: { title: 'listDemo' }
    },
    {
      path: '/error',
      component: () => import('@/views/error-page/401'),
      redirect: 'noRedirect',
      name: 'ErrorPages',
      alwaysShow: true, // 这个属性加上
      meta: {
        title: 'Error Pages',
        icon: '404'
      },
      children: [
        {
          path: '401',
          component: () => import('@/views/error-page/401'),
          name: 'Page401',
          meta: { title: '401', noCache: true }
        },
        {
          path: '404',
          component: () => import('@/views/error-page/404'),
          name: 'Page404',
          meta: { title: '404', noCache: true }
        }
      ]
    }
  ]
}

export default componentsRouter
