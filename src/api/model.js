import request from '@/utils/request'
import querystring from 'querystring'

export function addModel(model) {
  return request({
    url: '/models/add',
    method: 'post',
    data: querystring.stringify(model)
  })
}

export function getModels() {
  return request({
    url: '/models/list',
    method: 'get'
  })
}

export function getModel(id) {
  return request({
    url: '/models/detail?id=' + id,
    method: 'get'
  })
}

export function updateModel(model) {
  return request({
    url: '/models/update',
    method: 'post',
    data: querystring.stringify(model)
  })
}

export function removeModel(id) {
  return request({
    url: '/models/delete?id=' + id,
    method: 'get'
  })
}
