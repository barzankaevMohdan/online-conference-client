
export const state = () => ({
  rooms: [],
})

export const mutations = {
  createRoom(state, {roomID, streamID}) {
    state.rooms.push({roomID, streamID})
  },
  deleteRoom(state, roomID) {
    state.rooms = state.rooms.filter(room => room.roomID === roomID)
  },
}

// export const actions = {
//   createStream({commit, rootGetters}, streamData) {
//     return new Promise((resolve, reject) => {
//       api
//         .createStream(streamData.name)
//         .then((data) => {
//           commit('update', data.data)
//           resolve(data.data)
//         })
//         .catch((error) => {
//           if (error.response?.data) {
//             reject(error.response.data)
//           }
//           reject(error)
//         })
//     })
//   },
//   allStreams({commit}) {
//     return new Promise((resolve, reject) => {
//       api
//         .getAllStreams()
//         .then((data) => {
//           commit('update', data.data)
//           resolve(data.data)
//         })
//         .catch((error) => {
//           if (error.response?.data) {
//             reject(error.response.data)
//           }
//           reject(error)
//         })
//     })
//   },
// }

export const getters = {
  roomById: (state) => (id) => state.rooms.find(room => room.streamID === id)
}
