import request from '@/utils/request'

export function tableList(data) {
  return request({
    url: '/sys/generator/tableList?current=' + data.current + '&size=' + data.size + '&tableName=' + data.tableName,
    method: 'get'
  })
}

export function tableColumns(tableName) {
  return request({
    url: '/sys/generator/tableColumns?tableName=' + tableName,
    method: 'get'
  })
}
