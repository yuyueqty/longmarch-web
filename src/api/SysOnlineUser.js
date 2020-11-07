import request from '@/utils/request'

export function onlineUsers() {
  return request({
    url: '/onlineUsers',
    method: 'get'
  })
}

export function kickOutUser(sessionId) {
  return request({
    url: '/kickOutUser?sessionId=' + sessionId
  })
}
