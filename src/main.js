import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios } from './utils/request'

/**
 * 主题色初始化
 */
import bootstrap from './core/bootstrap'
import './core/use'
import './permission'
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
