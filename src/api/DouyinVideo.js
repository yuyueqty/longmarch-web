import request from '@/utils/request'
import qs from 'qs'

export function fetchList(data) {
  return request({
    url: '/videoList',
    method: 'get',
    params: qs.parse(data)
  })
}

export function videoDelete(data) {
  return request({
    url: '/videoDelete',
    method: 'post',
    params: qs.parse(data)
  })
}

export function videoCreate(data) {
  return request({
    url: '/videoCreate',
    method: 'post',
    params: qs.parse(data)
  })
}
