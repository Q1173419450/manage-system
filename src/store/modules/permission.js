import { asyncRouterMap, contentRouterMap } from '@/config/vue.router.config'

/**
 * 过滤账号是否拥有某一个权限，并将菜单从加载列表中移除
 *
 * @param {*} permission  权限
 * @param {*} route 路由
 */
function hasPermission (permission, route) {
  console.log('-- hasPermission --')
  console.log(permission)
  console.log(route)

  if (route.meta && route.meta.roles) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.roles.includes(permission)
      if (flag) {
        return true
      }
    }
    return false
  }
  return false
}

/**
 * 过滤账号权限
 *
 * @param {*} routerMap
 * @param {*} roles
 * @returns { Boolean }
 */
function filterAsyncRouter (routerMap, roles) {
  console.log('-- filterAsyncRouter --')
  console.log(routerMap)
  console.log(roles)

  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: contentRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = contentRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise((resolve, reject) => {
        try {
          const { roles } = data
          const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          console.log('-- GenerateRoutes --')
          console.log(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default permission
