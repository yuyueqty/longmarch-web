import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function treeList() {
  return request({
    url: '/sys/department/tree',
    method: 'post'
  })
}
export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

export function fetchList(data) {
  return request({
    url: '/sys/role/search',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/sys/role/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sys/role/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sys/role/delete',
    method: 'post',
    data
  })
}

export function handleLoadRoleUsers(data) {
  return request({
    url: '/sys/role/handleLoadRoleUsers',
    method: 'post',
    data
  })
}

export function addRoleUsers(data) {
  return request({
    url: '/sys/role/addRoleUsers',
    method: 'post',
    data
  })
}

export function showPerms(roleId) {
  return request({
    url: '/sys/role/show/perms/' + roleId,
    method: 'get'
  })
}

export function changeStatus(data) {
  return request({
    url: '/sys/role/changeStatus',
    method: 'post',
    data
  })
}
