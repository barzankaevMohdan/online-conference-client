<template  lang='pug'>
  Chat(
    :tab-options="tabOptions"
    :data="messages"
    @chatBlock_sendMessage="sendMessage"
    @chatBlock_loadMoreMessages="loadMoreMessages"
    @chatBlock_message_openBadge="openBadge"
  )
</template>

<script>
import Chat from '../Ui/Chat/index'
import socketIO from "~/mixins/socketIO";
import actualStream from "~/mixins/actualStream";
import {getCurrentTime} from "~/helpers/timeConverter";
import {ACTIONS} from "~/helpers/socketActions.js";

export default {
  name: 'BlockChat',
  components: {
    Chat,
  },
  mixins: [actualStream, socketIO],
  data() {
    return {
      tabOptions: [
        {
          id: 'chat',
          data:{
            title: 'Чат',
            isAvailabel: true,
            emptyText: "Будьте первыми в чате",
          },
        },
      ],
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
  async mounted() {
    this.socket.emit(ACTIONS.JOIN_CHAT, this.activeStreamId)

    this.socket.on(ACTIONS.MESSAGE, (message) => {
      this.$store.commit('chat/newMessage', message)
    })
    await this.$store.dispatch('chat/getRoomMessages', this.activeStreamId)
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
      this.socket.emit(ACTIONS.MESSAGE, {...data})
      await this.$store.dispatch('chat/sendMessage', data)
    },
    async loadMoreMessages(callback) {
      const messages = await this.$store.dispatch('chat/getRoomMessages', this.activeStreamId)
      if (!messages.length) {
        // eslint-disable-next-line node/no-callback-literal
        callback(true)
      } else {
        // eslint-disable-next-line node/no-callback-literal
        callback(false)
      }
    }
  },
}
</script>
