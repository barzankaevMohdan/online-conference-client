import api from '../services/ChatService'

let limit = 10
let offset = 0
let chatId = 0

export const state = () => ({
  messages: [],
  count: 1000,
})

export const mutations = {
  update(state, {messages, count}) {
    state.count = count
    state.messages.push(...messages)
    state.messages.sort((messageA, messageB) => messageA.id - messageB.id)
  },
  newMessage(state, message) {
    state.messages.push(message)
  },
  clear(state) {
    // возвращаем все исходные значения
    limit = 10
    offset = 0
    state.messages = []
    state.count = 1000
  },
}

export const actions = {
  sendMessage({commit, rootGetters}, message) {
    return new Promise((resolve, reject) => {
      api
        .sendMessage(message.id, message.text, message.time, message.user)
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
  getRoomMessages({state, commit}, id) {
    if (chatId !== id) {
      chatId = id
      commit('clear')
    }
    // получаем разницу между общим числом сообщений и смещения
    const stop = state.count - offset
    if (stop < limit && stop > 0) {
      // если разница меньше лимита то лимит приравниваем к разнице
      limit = stop
    }
    // если разница меньше нуля, невыполняем запрос
    if (stop <= 0) return []
    return new Promise((resolve, reject) => {
      api
        .getRoomMessages(id, limit, offset)
        .then((data) => {
          offset += limit
          commit('update', {
            messages: data.data.rows,
            count: data.data.count
          })
          resolve(data.data.rows)
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
  messages: (state) => state.messages,
}
