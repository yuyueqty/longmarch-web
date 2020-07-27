import request from '@/utils/request'
import qs from 'qs'

export function fetchList(data) {
  return request({
    url: '/videoList',
    method: 'get',
    params: qs.parse(data)
  })
}
