/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'System',
  meta: {
    title: 'system',
    icon: 'tree',
    roles: ['sys:manage']
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/user/index'),
      name: 'UserManage',
      meta: { title: 'userManage', noCache: true, icon: 'user', roles: ['sys:user:manage'] }
    },
    {
      path: 'role',
      component: () => import('@/views/role/index'),
      name: 'RoleManage',
      meta: { title: 'roleManage', icon: 'peoples', roles: ['sys:role:manage'] }
    },
    {
      path: 'department',
      component: () => import('@/views/department/index'),
      name: 'DepartmentManage',
      meta: { title: 'departmentManage', icon: 'peoples', roles: ['sys:department:manage'] }
    },
    {
      path: 'permission',
      component: () => import('@/views/permission/index'),
      name: 'PermissionManage',
      meta: { title: 'permissionManage', icon: 'lock', roles: ['sys:permission:manage'] }
    },
    {
      path: 'dictionary',
      component: () => import('@/views/dictionary/index'),
      name: 'DictionaryManage',
      meta: { title: 'dictionaryManage', icon: 'education', roles: ['sys:dictionary:manage'] }
    },
    {
      path: 'loginlog',
      component: () => import('@/views/log/loginLog'),
      name: 'LoginLogManage',
      meta: { title: 'loginLogManage', icon: 'bug', roles: ['sys:loginlog:manage'] }
    },
    {
      path: 'operatelog',
      component: () => import('@/views/log/operateLog'),
      name: 'OperateLogManage',
      meta: { title: 'operateLogManage', icon: 'bug', roles: ['sys:operatelog:manage'] }
    },
    {
      path: 'parameter',
      component: () => import('@/views/parameter/index'),
      name: 'ParameterManage',
      meta: { title: 'parameterManage', icon: 'clipboard', roles: ['sys:parameter:manage'] }
    },
    {
      path: 'schedule',
      component: () => import('@/views/job/schedule'),
      name: 'ScheduleManage',
      meta: { title: 'scheduleManage', noCache: true, icon: 'list', roles: ['job:schedule:manage'] }
    },
    {
      path: 'joblog',
      component: () => import('@/views/job/log'),
      name: 'JoblogManage',
      hidden: true,
      meta: { title: 'joblogManage', icon: 'list' }
    }
  ]
}
export default userRouter
