import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/sys/operate-log/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/sys/operate-log/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sys/operate-log/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sys/operate-log/delete',
    method: 'post',
    data
  })
}
