import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function refresh() {
  return request({
    url: '/refresh',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function fetchList(data) {
  return request({
    url: '/sys/user/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/sys/user/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sys/user/update',
    method: 'put',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sys/user/delete',
    method: 'post',
    data
  })
}
