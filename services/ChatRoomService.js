import $api from '../http'

export default class ChatRoomService {
  static async createChatRoom(id) {
    return await $api.post(`/chat_room`, {id})
  }
}
