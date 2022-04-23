import api from '../services/SpeechService'

export const SPEECH_TIME_FORMAT = 'HH:mm'

export const state = () => ({
  speeches: {},
})

export const mutations = {
  getSpeeches(state, speech) {
    state.speeches = speech.reduce((accumulator, speech) => {
      accumulator[speech.id] = speech
      return accumulator
    }, {})
  },
  updateSpeech(state, speech) {
    state.speeches = {
      ...state.speeches,
      [speech.id]: speech,
    }
  },
  deleteSpeech(state, id) {
    delete state.speeches[id]
    state.speeches = {
      ...state.speeches,
    }
  }
}

export const actions = {
  createSpeech({commit, rootGetters}, speechData) {
    return new Promise((resolve, reject) => {
      api
        .createSpeech(speechData)
        .then((data) => {
          commit('updateSpeech', data.data)
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
  updateSpeech({commit, rootGetters}, speechData) {
    return new Promise((resolve, reject) => {
      api
        .updateSpeech(speechData)
        .then((data) => {
          commit('updateSpeech', data.data)
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
  deleteSpeech({commit, rootGetters}, id) {
    return new Promise((resolve, reject) => {
      api
        .deleteSpeech(id)
        .then((data) => {
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
  allSpeeches({commit}) {
    return new Promise((resolve, reject) => {
      api
        .allSpeeches()
        .then((data) => {
          commit('getSpeeches', data.data)
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
  allSpeeches(state) {
    return Object.values(state.speeches ?? {})
  },
  byStreamId: (state, getters) => (id) => {
    const speech = getters.allSpeeches.filter(speech => speech.streamId === id)
    return speech
  }
}
