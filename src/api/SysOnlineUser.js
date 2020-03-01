import request from '@/utils/request'

export function onlineUsers() {
  return request({
    url: '/onlineUsers',
    method: 'get'
  })
}

export function kickOutUser(username) {
  return request({
    url: '/kickOutUser?username=' + username
  })
}
