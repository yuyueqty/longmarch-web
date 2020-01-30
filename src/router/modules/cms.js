/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const cmsRouter = {
  path: '/cms',
  component: Layout,
  redirect: '/cms/article',
  name: 'CmsManage',
  meta: {
    title: 'cmsManage',
    icon: 'documentation',
    roles: ['cms:manage']
  },
  children: [
    {
      path: 'article',
      component: () => import('@/views/cms/article'),
      name: 'ArticleManage',
      meta: { title: 'articleManage', icon: 'form', roles: ['cms:article:manage'] }
    },
    {
      path: 'category',
      component: () => import('@/views/cms/category'),
      name: 'CategoryManage',
      meta: { title: 'categoryManage', icon: 'list', roles: ['cms:category:manage'] }
    }
  ]
}
export default cmsRouter
