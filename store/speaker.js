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
  createSpeaker(state, speaker) {
    state.speakers[speaker.id] = speaker
  },
  delete(state, id) {
    delete state.speakers[id]
  }
}

export const actions = {
  createSpeaker({commit, rootGetters}, speakerData) {
    return new Promise((resolve, reject) => {
      api
        .createSpeaker(speakerData)
        .then((data) => {
          commit('createSpeaker', data.data)
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
          console.log(data.data);
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
          commit('delete', data.data)
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
