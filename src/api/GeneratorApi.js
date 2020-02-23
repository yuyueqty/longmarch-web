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

export function saveGenerator(data) {
  return request({
    url: '/sys/generator/saveGenerator',
    method: 'post',
    data
  })
}

export function batchSaveGenerator(data) {
  return request({
    url: '/sys/generator/batchSaveGenerator',
    method: 'post',
    data
  })
}

export function download(data) {
  return request({
    url: '/sys/generator/download?moduleName=' + data.moduleName + '&tableName=' + data.tableName,
    method: 'get'
  })
}
