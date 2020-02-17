import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/sys/user/search',
    method: 'post',
    data
  })
}

export function treeList() {
  return request({
    url: '/sys/department/tree',
    method: 'post'
  })
}

export function create(data) {
  return request({
    url: '/sys/user/create',
    method: 'post',
    data
  })
}

export function modifyingPersonalInfo(data) {
  return request({
    url: '/sys/user/modifyingPersonalInfo',
    method: 'post',
    data
  })
}

export function loadPersonalInfo() {
  return request({
    url: '/sys/user/loadPersonalInfo',
    method: 'get'
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

export function changePassword(data) {
  return request({
    url: '/sys/user/changePassword',
    method: 'post',
    data
  })
}

export function modifyingPersonalPassword(data) {
  return request({
    url: '/sys/user/modifyingPersonalPassword',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/sys/user/changeStatus',
    method: 'post',
    data
  })
}
