import request from '@/utils/request'

export function searchSchedule(data) {
  return request({
    url: '/job/schedule/search',
    method: 'post',
    data
  })
}

export function showSchedule(jobId) {
  return request({
    url: '/job/schedule/show/' + jobId,
    method: 'get'
  })
}

export function searchLog(data) {
  return request({
    url: '/job/log/search',
    method: 'post',
    data
  })
}

export function showLog(logId) {
  return request({
    url: '/job/log/show/' + logId,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/job/schedule/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/job/schedule/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/job/schedule/delete',
    method: 'post',
    data
  })
}

export function run(data) {
  return request({
    url: '/job/schedule/run',
    method: 'post',
    data
  })
}

export function pause(data) {
  return request({
    url: '/job/schedule/pause',
    method: 'post',
    data
  })
}

export function resume(data) {
  return request({
    url: '/job/schedule/resume',
    method: 'post',
    data
  })
}

export function reset(data) {
  return request({
    url: '/job/schedule/reset',
    method: 'post',
    data
  })
}
