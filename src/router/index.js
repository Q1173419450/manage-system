import Vue from 'vue'
import VueRouter from 'vue-router'
import { contentRouterMap } from '../config/vue.router.config'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  // 百度啥意思?滚动相关？
  scrollBehavior: () => ({ y: 0 }),
  routes: contentRouterMap
})

export default router
