import api from "~/services/PlayerService";

export const state = () => ({
  rooms: {},
})

export const mutations = {
  getRooms(state, rooms) {
    state.rooms = rooms.reduce((accumulator, currentRoom) => {
      accumulator[currentRoom.id] = currentRoom
      return accumulator
    }, {})
  },
  updateRoom(state, room) {
    state.rooms = {
      ...state.rooms,
      [room.id]: room,
    }
  },
  deleteRoom(state, id) {
    delete state.rooms[id]
    state.rooms = {
      ...state.rooms,
    }
  },
}

export const actions = {
  createStreamRoom({commit, rootGetters}, streamId) {
    return new Promise((resolve, reject) => {
      api
        .createStreamRoom(streamId)
        .then((data) => {
          commit('updateRoom', data.data)
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
  getAllRooms({commit, rootGetters}) {
    return new Promise((resolve, reject) => {
      api
        .getAllRooms()
        .then((data) => {
          commit('getRooms', data.data)
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
  deleteStreamRoom({commit, rootGetters}, roomId) {
    return new Promise((resolve, reject) => {
      api
        .deleteStreamRoom(roomId)
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
  allRooms: (state) => Object.values(state.rooms ?? {}),
  roomByStreamId: (state, getters) => (id) => {
    const room = getters.allRooms.find(room => room.streamId === id)
    return room
  }
}
