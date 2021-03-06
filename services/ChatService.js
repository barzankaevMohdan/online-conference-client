import $api from '../http'

export default class ChatService {
  static async sendMessage({id, text, time, user}) {
    return await $api.post(`/chat_rooms/${id}`, {text, time, user})
  }

  static async deleteMessage(id) {
    return await $api.delete(`/chat_rooms/message/${id}`)
  }

  static async getRoomMessages(id, limit, offset) {
    return await $api.get(`/chat_rooms/${id}`, {
      params: {
        limit,
        offset
      }
    })
  }
}
