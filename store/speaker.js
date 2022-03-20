import api from '../services/SpeakerService'

export const state = () => ({
  speakers: [],
})

export const mutations = {
  update(state, speaker) {
    state.speakers = speaker.reduce((accumulator, currentStream) => {
      accumulator[currentStream.id] = currentStream
      return accumulator
    }, {})
  },
}

export const actions = {
  createSpeaker({commit, rootGetters}, speakerData) {
    return new Promise((resolve, reject) => {
      api
        .createSpeaker(speakerData.login, speakerData.companyName, speakerData.name, speakerData.position, speakerData.about, speakerData.speechId)
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
  allSpeakers({commit}) {
    return new Promise((resolve, reject) => {
      api
        .allSpeakers()
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
  allSpeakers: (state) => Object.values(state.speakers ?? {}),
  bySpeechId: (state) => (id) => {
    const speaker = Object.values(state.speakers ?? {}).filter(speaker => speaker.speechId === id)
    return speaker
  },
  byId: (state) => (id) => {
    const speaker = Object.values(state.speakers ?? {}).filter(speaker => speaker.speechId === id)
    return speaker
  }
}
