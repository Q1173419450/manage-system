// eslint-disable-next-line
// import { UserLayout, BasicLayout, RouteView } from '@/layouts'
import Forbidden from '@/views/403'
import NotFound from '@/views/404'

export const asyncRouterMap = [
  {
    path: '/',
    meta: { title: '首页', roles: 'admin' },
    component: () => import(/* webpackChunkName: 'BasicLayout'  */'../layouts/BasicLayout'),
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: { render: h => h('router-view') },
        meta: { title: '仪表盘', keepAlive: true, icon: 'dashboard', roles: 'admin' },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('../views/Dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, roles: 'admin' }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: '监控页（外部）', target: '_blank', roles: 'admin' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('../views/Dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, roles: 'admin' }
          }
        ]
      },
      {
        path: '/account',
        name: 'account',
        redirect: '/account/center',
        component: { render: h => h('router-view') },
        meta: { title: '个人页', icon: 'user', keepAlive: true, roles: 'admin' },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('../views/Account/Center/Index'),
            meta: { title: '个人中心', keepAlive: true, roles: 'admin' }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('../views/Account/Settings/Index'),
            // redirect: '/account/settings/base',
            meta: { title: '个人设置', hideHeader: true, roles: 'admin' }
            // hideChildrenInMenu: true,
            // children: [
            //   {
            //     path: '/account/settings/base',
            //     name: 'BaseSettings',

            //   }
            // ]
          }
        ]
      },
      { // other
        path: '/other',
        name: 'otherPage',
        component: { render: h => h('router-view') },
        meta: { title: '角色权限', icon: 'slack', roles: 'admin' },
        redirect: '/other/user-list',
        children: [
          {
            path: '/other/user-list',
            name: 'UserList',
            component: () => import('../views/Other/UserList'),
            meta: { title: '用户列表', roles: 'admin' }
          },
          {
            path: '/other/role-list',
            name: 'RoleList',
            component: () => import('../views/Other/RoleList'),
            meta: { title: '角色列表', roles: 'admin' }
          },
          {
            path: '/other/permission-list',
            name: 'PermissionList',
            component: () => import('../views/Other/PermissionList'),
            meta: { title: '权限列表', roles: 'admin' }
          }
        ]
      }
    ]
  }
]

/**
 *
 */
export const contentRouterMap = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'UserLayout'  */'../layouts/UserLayout'),
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'user' */'../views/user/Login')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import(/* webpackChunkName: 'user' */'../views/user/Register')
      }
    ]
  },
  {
    path: '/403',
    name: '403page',
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: '*',
    name: '404page',
    hideInMenu: true,
    component: NotFound
  }
]
