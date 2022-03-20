import api from '../services/StreamService'

export const state = () => ({
  streams: {},
})

export const mutations = {
  update(state, streams) {
    state.streams = streams.reduce((accumulator, currentStream) => {
      accumulator[currentStream.id] = currentStream
      return accumulator
    }, {})
  },
}

export const actions = {
  createStream({commit, rootGetters}, streamData) {
    return new Promise((resolve, reject) => {
      api
        .createStream(streamData.name)
        .then((data) => {
          commit('update', data.data)
          resolve(data.data)
        })
        .catch((error) => {
          if (error.response?.data) {
            reject(error.response.data)
          }
          reject(error)
        })
    })
  },
  allStreams({commit}) {
    return new Promise((resolve, reject) => {
      api
        .getAllStreams()
        .then((data) => {
          commit('update', data.data)
          resolve(data.data)
        })
        .catch((error) => {
          if (error.response?.data) {
            reject(error.response.data)
          }
          reject(error)
        })
    })
  },
}

export const getters = {
  allStreams: (state) => Object.values(state.streams ?? {}),
  bySpeechId: (state) => (id) => {
    const stream = Object.values(state.streams ?? {}).filter(stream => stream.id === id)
    return stream
  }
}
