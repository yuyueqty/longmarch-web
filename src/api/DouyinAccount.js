import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/douyin/list',
    method: 'get'
  })
}

export function oauth() {
  return request({
    url: '/douyin/loginUrl',
    method: 'get'
  })
}
