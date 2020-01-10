// import Vue from 'vue'
import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { Authorization } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    welcome: '',
    info: {},
    roles: []
  },

  mutations: {
    SET_Authorization: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      console.log('--------- 登录login 测试 -----------')
      console.log(commit)
      return new Promise((resolve, reject) => {
        login(userInfo).then((response) => {
          Vue.ls.set(Authorization, `Bearer  ${response.data}`, 7 * 24 * 60 * 60 * 1000)
          commit('SET_Authorization', `Bearer  ${response.data}`)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          if (result.userName) {
            commit('SET_ROLES', result.userName)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.nickName, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_Authorization', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(Authorization)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
