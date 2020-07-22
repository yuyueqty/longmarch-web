import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/douyin/list',
    method: 'get'
  })
}
