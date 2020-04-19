import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/wx/gzh-account/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/wx/gzh-account/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/wx/gzh-account/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/wx/gzh-account/delete',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/wx/gzh-account/changeStatus',
    method: 'post',
    data
  })
}

export function setDefault(id) {
  return request({
    url: '/wx/gzh-account/changeDefault/' + id,
    method: 'get'
  })
}
