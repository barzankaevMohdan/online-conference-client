import api from '../services/SpeakerService'

export const state = () => ({
  speakers: {},
})

export const mutations = {
  getSpeakers(state, speaker) {
    state.speakers = speaker.reduce((accumulator, currentStream) => {
      accumulator[currentStream.id] = currentStream
      return accumulator
    }, {})
  },
  updateSpeaker(state, speaker) {
    state.speakers = {
      ...state.speakers,
      [speaker.id]: speaker,
    }
  },
  deleteSpeaker(state, id) {
    delete state.speakers[id]
    state.speakers = {
      ...state.speakers,
    }
  }
}

export const actions = {
  createSpeaker({commit, rootGetters}, speakerData) {
    return new Promise((resolve, reject) => {
      api
        .createSpeaker(speakerData)
        .then((data) => {
          commit('updateSpeaker', data.data)
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
  updateSpeaker({commit, rootGetters}, speakerData) {
    return new Promise((resolve, reject) => {
      api
        .updateSpeaker(speakerData)
        .then((data) => {
          commit('updateSpeaker', data.data)
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
  deleteSpeaker({commit, rootGetters}, id) {
    return new Promise((resolve, reject) => {
      api
        .deleteSpeaker(id)
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
  allSpeakers({commit}) {
    return new Promise((resolve, reject) => {
      api
        .allSpeakers()
        .then((data) => {
          commit('getSpeakers', data.data)
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
  allSpeakers: (state) => Object.values(state.speakers ?? {}),
  bySpeechId: (state, getters) => (id) => {
    const speaker = getters.allSpeakers.filter(speaker => speaker.speechId === id)
    return speaker
  },
}
