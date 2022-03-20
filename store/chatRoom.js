import api from '../services/ChatRoomService'

export const actions = {
  createChatRoom({commit, rootGetters}, id) {
    return new Promise((resolve, reject) => {
      api
        .createChatRoom(id)
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