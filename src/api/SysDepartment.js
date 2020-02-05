import request from '@/utils/request'

export function treeList() {
  return request({
    url: '/sys/department/tree',
    method: 'post'
  })
}

export function fetchList(data) {
  return request({
    url: '/sys/department/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/sys/department/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sys/department/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sys/department/delete',
    method: 'post',
    data
  })
}

export function getPIds(id) {
  return request({
    url: '/sys/department/getPIds/' + id,
    method: 'get'
  })
}

export function handleLoadDepartmentUsers(data) {
  return request({
    url: '/sys/department/handleLoadDepartmentUsers',
    method: 'post',
    data
  })
}

export function addDepartmentUsers(data) {
  return request({
    url: '/sys/department/addDepartmentUsers',
    method: 'post',
    data
  })
}
