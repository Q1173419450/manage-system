import { axios } from '@/utils/request'

export function login (parameter) {
  return axios({
    url: '/auth/login/system_user',
    method: 'post',
    data: parameter
  })
}

export function getInfo (parameter) {
  return axios({
    url: '/user/current/system_user',
    method: 'get',
    data: parameter
  })
}

export function logout (parameter) {
  return axios({
    url: `/auth/user/logout?access_token=${parameter}`,
    method: 'POST'
  })
}
