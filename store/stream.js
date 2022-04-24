import api from '../services/StreamService'

export const state = () => ({
  streams: {},
})

export const mutations = {
  getStreams(state, streams) {
    state.streams = streams.reduce((accumulator, currentStream) => {
      accumulator[currentStream.id] = currentStream
      return accumulator
    }, {})
  },
  updateStream(state, stream) {
    state.streams = {
      ...state.streams,
      [stream.id]: stream,
    }
  },
  deleteStream(state, id) {
    delete state.streams[id]
    state.streams = {
      ...state.streams,
    }
  }
}

export const actions = {
  createStream({commit}, streamData) {
    return new Promise((resolve, reject) => {
      api
        .createStream(streamData.name)
        .then((data) => {
          commit('updateStream', data.data)
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
  deleteStream({commit}, id) {
    return new Promise((resolve, reject) => {
      api
        .deleteStream(id)
        .then((data) => {
          commit('deleteStream', id)
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
          commit('getStreams', data.data)
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
  byId: (state, getters) => (id) => {
    const stream = getters.allStreams.find(stream => stream.id === id)
    return stream
  },
  firstStream: (state, getters) => getters.allStreams[0],
}
