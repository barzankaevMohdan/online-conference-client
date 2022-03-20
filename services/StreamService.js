import $api from '../http'

export default class StreamService {
  static async createStream(name) {
    return await $api.post('/streams', {name})
  }

  static async getAllStreams() {
    return await $api.get('/streams')
  }
}
