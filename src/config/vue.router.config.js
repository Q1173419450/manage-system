// eslint-disable-next-line
// import { UserLayout, BasicLayout, RouteView } from '@/layouts'
import Forbidden from '@/views/403'
import NotFound from '@/views/404'

export const asyncRouterMap = [
  {
    path: '/',
    meta: { title: '首页', roles: 'admin' },
    // component: () => import(/* webpackChunkName: 'BasicLayout' */'../layouts/BasicLayout'),
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
      }
    ]
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: NotFound
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
