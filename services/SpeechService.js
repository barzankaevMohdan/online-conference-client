import $api from '../http'

export default class StreamService {
  static async createSpeech(title, info, timeBegin, timeEnd, status, streamId) {
    return await $api.post('/speeches', {title, info, time_begin: timeBegin, time_end: timeEnd, status, streamId})
  }

  static async deleteSpeech(id) {
    return await $api.delete(`/speeches/${id}`)
  }

  static async allSpeeches() {
    return await $api.get('/speeches')
  }
}
