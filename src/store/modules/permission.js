import { constantRoutes } from '@/router'

export function filterAsyncRoutes(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    const component = route.component
    if (component) {
      if (component === 'Layout') {
        route.component = resolve => {
          require(['@/layout/'], resolve)
        }
      } else {
        route.component = resolve => {
          require(['@/views/' + component + '.vue'], resolve)
        }
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRoutes(route.children)
    }
    return true
  })
  return accessedRouters
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, routes) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(routes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
