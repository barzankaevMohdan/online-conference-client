import $api from '../http'

export default class StreamService {
  static async createStreamRoom(roomId, streamId) {
    return await $api.post('/stream/room', {roomId, streamId})
  }

  static async getAllRooms() {
    return await $api.get('/stream/room')
  }

  static async deleteStreamRoom(roomId, streamId) {
    return await $api.post('/stream/room/delete', {roomId, streamId})
  }
}
