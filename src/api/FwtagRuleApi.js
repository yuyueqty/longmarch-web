import request from '@/utils/request'

export function rules() {
  return request({
    url: '/wx/fwtag-rule/rules',
    method: 'get'
  })
}

export function saveRule(data) {
  return request({
    url: '/wx/fwtag-rule/saveRule',
    method: 'post',
    data
  })
}
