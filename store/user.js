import axios from "axios";
import api from '../services/AuthService'
import config from "~/config";

export const state = () => ({
  user: {},
  isServer: true,
  token: localStorage.getItem('token'),
  isLoading: false,
})

export const mutations = {
  clear(state) {
    state.isLoading = false
    state.user = {}
    state.token = null
    // zeenApi.clearToken()
  },
  update(state, {refreshToken, user}) {
    if (user) {
      state.user = user
    }
    if (refreshToken) {
      state.token = refreshToken
    }
  },
}

export const actions = {
  registration({commit, rootGetters}, userData) {
    return new Promise((resolve, reject) => {
      api
        .registration(userData.email, userData.password, userData.name)
        .then((data) => {
          localStorage.setItem('token', data.data.accessToken)
          commit('update', data.data)
          resolve(data.data)
        })
        .catch((error) => {
          if (error.response.data) {
            reject(error.response.data)
          }
          reject(error)
        })
    })
  },
  logIn({commit}, userData) {
    return new Promise((resolve, reject) => {
      api
        .login(userData.login, userData.password)
        .then((data) => {
          localStorage.setItem('token', data.data.accessToken)
          commit('update', data.data)
          resolve(data.data)
        })
        .catch((error) => {
          if (error.response.data) {
            reject(error.response.data)
          }
          reject(error)
        })
    })
  },
  async logOut({commit, rootGetters}) {
    await  api.logout()
    localStorage.removeItem('token')
    commit('clear')
  },
  async checkAuth({commit, rootGetters}) {
    try {
      const data = await axios.get(`${config.BASE_URL}/user/refresh`, {withCredentials: true})
      localStorage.setItem('token', data.data.accessToken)
      commit('update', data.data)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
}

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isAuth: (state) => {
    return !!state.token
  },
  id: (state) => state.user.id,
}
