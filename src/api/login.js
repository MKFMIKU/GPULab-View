import request from '@/utils/request'
import querystring from 'querystring'

export function login(username, password) {
  return request({
    url: '/users/login',
    method: 'post',
    data: querystring.stringify({
      username,
      password
    })
  })
}

export function getInfo(id) {
  return request({
    url: '/users/info',
    method: 'post',
    data: querystring.stringify({
      id
    })
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
