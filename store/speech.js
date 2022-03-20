import api from '../services/SpeechService'

export const SPEECH_TIME_FORMAT = 'HH:mm'

export const state = () => ({
  speeches: {},
})

export const mutations = {
  update(state, speech) {
    state.speeches = speech.reduce((accumulator, currentStream) => {
      accumulator[currentStream.id] = currentStream
      return accumulator
    }, {})
  },
}

export const actions = {
  createSpeech({commit, rootGetters}, speechData) {
    return new Promise((resolve, reject) => {
      api
        .createSpeech(speechData.title, speechData.info, speechData.timeBegin, speechData.timeEnd, speechData.status, speechData.streamId)
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
  allSpeeches({commit}) {
    return new Promise((resolve, reject) => {
      api
        .allSpeeches()
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
  allSpeeches: (state) => Object.values(state.speeches ?? {}),
  byStreamId: (state) => (id) => {
    const speech = Object.values(state.speeches ?? {}).filter(speech => speech.streamId === id)
    return speech
  }
}
