<template lang="pug">
  div(ref='modalRoot')
    ModalsAuthenticate
    ModalsErrorLoginExist
    ModalsErrorUserNotFound
    ModalsNowOnline
    ModalsAdminCreateSpeech
    ModalsAdminCreateStream
    ModalsAdminCreateSpeaker
    ModalsAdminCreateChatRoom
    ModalsAdminEditSpeech
    ModalsAdminEditSpeaker
</template>

<script>
export default {
  name: 'AllMainModalsHere',
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
