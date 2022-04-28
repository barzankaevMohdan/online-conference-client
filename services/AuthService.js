import $api from '../http'

export default class AuthService {
  static async login({email, password}) {
    return await $api.post('/user/login', {email, password})
  }

  static async registration({email, password, name}) {
    return await $api.post('/user/registration', {email, password, name})
  }

  static async logout(refreshToken) {
    return await $api.post('/user/logout', {refreshToken}) // change to $api.post('/user/logout') get
  }

  static async refresh(refreshToken) {
    return await $api.post('/user/refresh', {refreshToken}) // change to $api.post('/user/refresh') get
  }

  static async forgotPassword(login) {
    return await $api.post('/user/recovery', {login})
  }

  static async recovery({link, password}) {
    return await $api.post(`/user/recovery/${link}`, {password})
  }
}
