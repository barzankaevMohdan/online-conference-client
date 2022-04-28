import api from '../services/AuthService'

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
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
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
        .registration(userData)
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
        .login(userData)
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
  checkAuth({commit, state}) {
    // change to  cookie
    const refreshToken = localStorage.getItem('refreshToken')
    return new Promise((resolve, reject) => {
      api
        .refresh(refreshToken)
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
  forgotPassword({commit, state}, login) {
    return new Promise((resolve, reject) => {
      api
        .forgotPassword(login)
        .then((data) => {
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
  recovery({commit, state}, data) {
    return new Promise((resolve, reject) => {
      api
        .recovery(data)
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
    commit('clear')
  },
}

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isAuth: (state) => {
    return !!state.token
  },
  id: (state) => state.user.id,
}
