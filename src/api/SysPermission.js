import request from '@/utils/request'

export function treeList() {
  return request({
    url: '/sys/permission/tree',
    method: 'post'
  })
}

export function fetchList(data) {
  return request({
    url: '/sys/permission/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/sys/permission/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sys/permission/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sys/permission/delete',
    method: 'post',
    data
  })
}

export function getPIds(id) {
  return request({
    url: '/sys/permission/getPIds/' + id,
    method: 'get'
  })
}

export function changeStatus(data) {
  return request({
    url: '/sys/permission/changeStatus',
    method: 'post',
    data
  })
}
