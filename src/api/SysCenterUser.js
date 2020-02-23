import request from '@/utils/request'

export function modifyingPersonalInfo(data) {
  return request({
    url: '/sys/center/user/modifyingPersonalInfo',
    method: 'post',
    data
  })
}

export function loadPersonalInfo() {
  return request({
    url: '/sys/center/user/loadPersonalInfo',
    method: 'get'
  })
}

export function modifyingPersonalPassword(data) {
  return request({
    url: '/sys/center/user/modifyingPersonalPassword',
    method: 'post',
    data
  })
}
