import $api from '../http'

export default class StreamService {
  static async createSpeaker(login, companyName, name, position, about, speechId) {
    return await $api.post('/speakers', {login, companyName, name, position, about, speechId})
  }

  static async allSpeakers() {
    return await $api.get('/speakers')
  }
}
