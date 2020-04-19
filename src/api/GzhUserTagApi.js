import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/wx/gzh-user-tag/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/wx/gzh-user-tag/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/wx/gzh-user-tag/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/wx/gzh-user-tag/delete',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/wx/gzh-user-tag/changeStatus',
    method: 'post',
    data
  })
}
