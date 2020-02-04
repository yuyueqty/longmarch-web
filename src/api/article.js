import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/cms/article/search',
    method: 'post',
    data
  })
}

export function show(id) {
  return request({
    url: '/cms/article/show/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/cms/article/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/cms/article/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/cms/article/delete',
    method: 'post',
    data
  })
}

export function loadCategory(data) {
  return request({
    url: '/cms/article/loadCategory',
    method: 'get',
    data
  })
}

export function changeRecommendStatus(data) {
  return request({
    url: '/cms/article/changeRecommendStatus',
    method: 'post',
    data
  })
}
