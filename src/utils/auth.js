// 身份验证
import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
// + parseInt(Math.random() * 100)
// const TokenKey = new Date()

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
