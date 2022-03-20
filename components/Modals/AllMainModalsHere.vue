<template lang="pug">
  div(ref='modalRoot')
    AuthenticateModal
    ErrorLoginExistModal
    ErrorUserNotFound
    CreateSpeechModal
    CreateStreamModal
    CreateSpeakerModal
    CreateChatRoomModal
    NowOnlineModal
</template>

<script>
import AuthenticateModal from './AuthenticateModal'
import ErrorLoginExistModal from './ErrorLoginExistModal'
import ErrorUserNotFound from './ErrorUserNotFound'
import CreateSpeechModal from './CreateSpeechModal'
import CreateStreamModal from './CreateStreamModal'
import CreateSpeakerModal from './CreateSpeakerModal'
import NowOnlineModal from './NowOnlineModal'
import CreateChatRoomModal from './CreateChatRoomModal'

export default {
  name: 'AllMainModalsHere',
  components: {
    AuthenticateModal,
    ErrorLoginExistModal,
    ErrorUserNotFound,
    CreateSpeechModal,
    CreateStreamModal,
    CreateSpeakerModal,
    NowOnlineModal,
    CreateChatRoomModal
  },
  data() {
    return {
      mountedKey: false,
    }
  },
  mounted() {
    this.mountedKey = true
    const event = new Event('modalsReady', {bubbles: true})
    this.$refs.modalRoot.dispatchEvent(event)
  },
}
</script>
