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

export function refreshToken(openId) {
  return request({
    url: '/douyin/refreshToken/' + openId,
    method: 'get'
  })
}

export function setDefault(openId) {
  return request({
    url: '/douyin/setDefault/' + openId,
    method: 'post'
  })
}
