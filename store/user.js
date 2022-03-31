// import axios from "axios";
import api from '../services/AuthService'
// import config from "~/config";

export const state = () => ({
  user: {},
  isServer: true,
  token: localStorage.getItem('refreshToken'), // change to token
  isLoading: false,
})

export const mutations = {
  clear(state) {
    state.isLoading = false
    state.user = {}
    state.token = null
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
          localStorage.setItem('refreshToken', data.data.refreshToken) // delete
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
          localStorage.setItem('refreshToken', data.data.refreshToken) // delete
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
    const refreshToken = localStorage.getItem('refreshToken')
    await api.logout(refreshToken)
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    commit('clear')
  },
  checkAuth({commit, state}) {
    // change to  cookie
    const refreshToken = localStorage.getItem('refreshToken')
    return new Promise((resolve, reject) => {
      api
        .refresh(refreshToken)
        .then((data) => {
          localStorage.setItem('token', data.data.accessToken)
          localStorage.setItem('refreshToken', data.data.refreshToken) // delete
          console.log(data.data)
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
    // try {
    //   const data = await axios.get(`${config.BASE_URL}/user/refresh`, {withCredentials: true})
    //   localStorage.setItem('token', data.data.accessToken)
    //   localStorage.setItem('refreshToken', data.data.refreshToken)
    //   commit('update', data.data)
    // } catch (e) {
    //   console.log(e.response?.data?.message)
    // }
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
