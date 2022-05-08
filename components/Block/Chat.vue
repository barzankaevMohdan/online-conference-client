<template  lang='pug'>
  UiChat(
    :data="messages"
    @chatBlock_sendMessage="sendMessage"
    @chatBlock_loadMoreMessages="loadMoreMessages"
    @chatBlock_message_openBadge="openBadge"
  )
</template>

<script>
import socketIO from "~/mixins/socketIO";
import actualStream from "~/mixins/actualStream";
import {getCurrentTime} from "~/helpers/timeConverter";
import {ACTIONS} from "~/helpers/socketActions.js";

export default {
  name: 'BlockChat',
  mixins: [actualStream, socketIO],
  mounted() {
    if (this.activeStreamId) {
      this.$store.dispatch('chat/getRoomMessages', this.activeStreamId)
      this.socket.emit(ACTIONS.JOIN_CHAT, this.activeStreamId)
    }
    this.socket.on(ACTIONS.MESSAGE, (message) => {
      this.$store.commit('chat/newMessage', message)
    })
  },
  methods: {
    openBadge(message) {
      this.$vfm.show('user-badge', message)
    },
    async sendMessage(text) {
      const data = {
        id: this.activeStreamId,
        text,
        time: getCurrentTime('HH:mm'),
        user: this.user
      }
      await this.$store.dispatch('chat/sendMessage', data).then(data => {
        this.socket.emit(ACTIONS.MESSAGE, data)
      })
    },
    async loadMoreMessages(callback) {
      const messages = await this.$store.dispatch('chat/getRoomMessages', this.activeStreamId)
      if (!messages.length) {
        callback(true)
      } else {
        callback(false)
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    messages() {
      return this.$store.getters['chat/messages'] ?? []
    }
  },
  watch: {
    activeStreamId(val) {
      this.$store.dispatch('chat/getRoomMessages', val)
      this.socket.emit(ACTIONS.JOIN_CHAT, val)
    }
  }
}
</script>
