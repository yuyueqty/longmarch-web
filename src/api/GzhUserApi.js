import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/wx/gzh-user/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/wx/gzh-user/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/wx/gzh-user/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/wx/gzh-user/delete',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/wx/gzh-user/changeStatus',
    method: 'post',
    data
  })
}

export function batchSync(data) {
  return request({
    url: '/wx/gzh-user/syncWxUserInfo',
    method: 'get',
    params: { 'batchSync': data }
  })
}

export function analyseTag(data) {
  return request({
    url: '/wx/gzh-user/analyseUserTag',
    method: 'get'
  })
}

export function downloadWxUser(data) {
  return request({
    url: '/wx/gzh-user/download',
    method: 'get'
  })
}

export function syncMore(data) {
  return request({
    url: '/wx/gzh-user/syncMore',
    method: 'post',
    data
  })
}

export function analyseMore(data) {
  return request({
    url: '/wx/gzh-user/analyseMore',
    method: 'post',
    data
  })
}

export function processTag() {
  return request({
    url: '/wx/gzh-user/process',
    method: 'get'
  })
}
