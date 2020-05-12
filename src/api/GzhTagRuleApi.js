import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/wx/gzh-tag-rule/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/wx/gzh-tag-rule/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/wx/gzh-tag-rule/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/wx/gzh-tag-rule/delete',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/wx/gzh-tag-rule/changeStatus',
    method: 'post',
    data
  })
}
