import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'

import { Authorization } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/',
  timeout: 6000
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(Authorization)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      // token
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.history.go(0)
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use(config => {
  const token = Vue.ls.get(Authorization)
  console.log(config)
  console.log(token)
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, err)

service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
