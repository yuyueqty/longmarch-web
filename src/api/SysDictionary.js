import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/sys/dictionary/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/sys/dictionary/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sys/dictionary/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sys/dictionary/delete',
    method: 'post',
    data
  })
}

export function loadDictionaryCode() {
  return request({
    url: '/sys/dictionary/loadDictionaryCode',
    method: 'get'
  })
}

export function changeStatus(data) {
  return request({
    url: '/sys/dictionary/changeStatus',
    method: 'post',
    data
  })
}
