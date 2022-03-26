import api from "~/services/PlayerService";

export const state = () => ({
  rooms: [],
})

export const mutations = {
  createRoom(state, rooms) {
    state.rooms = rooms.reduce((accumulator, currentRoom) => {
      accumulator[currentRoom.id] = currentRoom
      return accumulator
    }, {})
  },
  deleteRoom(state, roomId) {
    state.rooms = delete state.rooms[roomId]
  },
}

export const actions = {
  createStreamRoom({commit, rootGetters}, roomData) {
    return new Promise((resolve, reject) => {
      api
        .createStreamRoom(roomData.roomId, roomData.streamId)
        .then((data) => {
          commit('createRoom', data.data)
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
          commit('createRoom', data.data)
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
  // deleteStreamRoom({commit, rootGetters}, roomData) {
  //   console.log(roomData.roomId)
  //   return new Promise((resolve, reject) => {
  //     api
  //       .deleteStreamRoom(roomData.roomId, roomData.streamId)
  //       .then((data) => {
  //         commit('deleteRoom', data.data.id)
  //         resolve(data.data)
  //       })
  //       .catch((error) => {
  //         if (error.response?.data) {
  //           reject(error.response.data)
  //         }
  //         reject(error)
  //       })
  //   })
  // },
}

export const getters = {
  allRooms: (state) => state.rooms,
  roomById: (state) => (id) => {
    const room = Object.values(state.rooms ?? {}).find(room => room.streamId === id)
    return room
  }
}
