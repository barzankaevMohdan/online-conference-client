<template lang='pug'>
  UiModal(
    name='create-chat-modal'
  )
    ChatRoomCreateForm
</template>

<script>
import ChatRoomCreateForm from '../Admin/ChatRoomCreateForm.vue'

export default {
  name: 'CreateChatRoomModal',
  components: {ChatRoomCreateForm},
}
</script>
