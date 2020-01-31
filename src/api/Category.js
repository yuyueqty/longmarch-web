import request from '@/utils/request'

export function treeList() {
  return request({
    url: '/cms/category/tree',
    method: 'post'
  })
}

export function fetchList(data) {
  return request({
    url: '/cms/category/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/cms/category/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/cms/category/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/cms/category/delete',
    method: 'post',
    data
  })
}

export function getPIds(id) {
  return request({
    url: '/cms/category/getPIds/' + id,
    method: 'get'
  })
}
