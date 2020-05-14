import request from '@/utils/request'

export function list() {
  return request({
    url: '/wx/gzh-tag/list',
    method: 'post'
  })
}

export function loadRule(tagId) {
  return request({
    url: '/wx/gzh-tag/loadRule/' + tagId,
    method: 'get'
  })
}

export function fetchList(data) {
  return request({
    url: '/wx/gzh-tag/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/wx/gzh-tag/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/wx/gzh-tag/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/wx/gzh-tag/delete',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/wx/gzh-tag/changeStatus',
    method: 'post',
    data
  })
}

export function syncTagToWx(data) {
  return request({
    url: '/wx/gzh-tag/syncTagToWx',
    method: 'post',
    data
  })
}

export function batchTagging(tagId) {
  return request({
    url: '/wx/gzh-tag/batchTagging/' + tagId,
    method: 'get'
  })
}

export function remoteTagRemove(data) {
  return request({
    url: '/wx/gzh-tag/wxTagRemove',
    method: 'post',
    data
  })
}
