import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/wx/gzh-fenwei-tag/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/wx/gzh-fenwei-tag/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/wx/gzh-fenwei-tag/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/wx/gzh-fenwei-tag/delete',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/wx/gzh-fenwei-tag/changeStatus',
    method: 'post',
    data
  })
}
