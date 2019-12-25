import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { Authorization } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false })

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(Authorization)) {
    if (to.path === '/user/login') {
      next({ path: '/dashboard/workplace' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          console.log(res)
          const roles = res.data && res.data.userName
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            console.log(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            console.log(redirect)
            if (to.path === redirect) {
              next({ path: redirect })
            } else {
              next({ path: redirect })
            }
          })
        }).catch(() => {
          notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试'
          })
          store.dispatch('Logout').then(() => {
            // query: { redirect: to.fullPath }
            next({ path: '/user/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      console.log(to)
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
