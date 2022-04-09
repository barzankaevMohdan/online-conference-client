import $api from '../http'

export default class StreamService {
  static async createSpeaker({login, company_name, name, position, about, speechId}) {
    return await $api.post('/speakers', {login, company_name, name, position, about, speechId})
  }

  static async updateSpeaker({id, login, company_name, name, position, about, speechId}) {
    return await $api.put(`/speakers/${id}`, {login, company_name, name, position, about, speechId})
  }

  static async deleteSpeaker(id) {
    return await $api.delete(`/speakers/${id}`)
  }

  static async allSpeakers() {
    return await $api.get('/speakers')
  }
}
