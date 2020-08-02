import request from '@/utils/request'

export function starHotListGet(hotListType) {
  return request({
    url: '/starHotListGet?hotListType=' + hotListType,
    method: 'get'
  })
}

export function starAuthorScoreV2Get(uniqueId) {
  return request({
    url: '/starAuthorScoreV2Get?uniqueId=' + uniqueId,
    method: 'get'
  })
}
