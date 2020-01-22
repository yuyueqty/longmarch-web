import request from '@/utils/request'

export function getByParameterName(parameterName) {
  return request({
    url: '/sys/parameter/getByParameterName/' + parameterName,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/sys/parameter/update',
    method: 'post',
    data
  })
}
