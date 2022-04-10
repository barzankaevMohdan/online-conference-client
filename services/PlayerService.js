import $api from '../http'

export default class StreamService {
  static async createStreamRoom(streamId) {
    return await $api.post('/stream/room', {streamId})
  }

  static async getAllRooms() {
    return await $api.get('/stream/room')
  }

  static async deleteStreamRoom(roomId) {
    return await $api.delete(`/stream/room/${roomId}`)
  }
}
