import request from '@/utils/request'

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
    method: 'post',
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

export function loadRoles() {
  return request({
    url: '/sys/role/loadRoles',
    method: 'get'
  })
}
