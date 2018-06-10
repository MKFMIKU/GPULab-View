import request from '@/utils/request'
import querystring from 'querystring'

export function addExperiment(experiment) {
  return request({
    url: '/experiments/add',
    method: 'post',
    data: querystring.stringify(experiment)
  })
}

export function getExperiments(id) {
  return request({
    url: '/experiments/model?id=' + id,
    method: 'get'
  })
}

