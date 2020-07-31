import request from '@/utils/request'

export function hotsearchSentencesGet() {
  return request({
    url: '/hotsearchSentencesGet',
    method: 'get'
  })
}

export function hotsearchVideosGet(hotSentence) {
  return request({
    url: '/hotsearchVideosGet?hotSentence=' + hotSentence,
    method: 'get'
  })
}
