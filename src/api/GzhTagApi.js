import request from '@/utils/request'

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
