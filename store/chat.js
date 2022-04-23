import api from '../services/ChatService'

let limit = 10
let offset = 0
let chatId = 0

export const state = () => ({
  messages: {},
  count: limit,
})

export const mutations = {
  update(state, {messages, count}) {
    state.count = count
    const newMessages = messages.reduce((accumulator, message) => {
      accumulator[message.id] = message
      return accumulator
    }, {})
    state.messages = {
      ...state.messages,
      ...newMessages
    }
  },
  newMessage(state, message) {
    state.messages = {
      ...state.messages,
      [message.id]: message,
    }
  },
  deleteMessage(state, id) {
    delete state.messages[id]
    state.messages = {
      ...state.messages,
    }
  },
  clear(state) {
    // возвращаем все исходные значения
    limit = 10
    offset = 0
    state.messages = []
    state.count = limit
  },
}

export const actions = {
  sendMessage({commit, rootGetters}, message) {
    return new Promise((resolve, reject) => {
      api
        .sendMessage(message)
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
    const diff = state.count - offset
    // если разница меньше нуля, невыполняем запрос
    if (diff <= 0) return []
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
  deleteMessage({commit, rootGetters}, id) {
    return new Promise((resolve, reject) => {
      api
        .deleteMessage(id)
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
}

export const getters = {
  messages(state) {
    const messages = Object.values(state.messages ?? {})
    return messages.sort((messageA, messageB) => messageA.id - messageB.id)
  },
}
