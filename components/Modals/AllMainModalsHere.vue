<template lang="pug">
  div(ref='modalRoot')
    ModalsAuthenticate
    ModalsErrorLoginExist
    ModalsErrorUserNotFound
    ModalsNowOnline
    ModalsUserBadge
    ModalsAdminCreateSpeech
    ModalsAdminCreateStream
    ModalsAdminCreateSpeaker
    ModalsAdminEditSpeech
    ModalsAdminEditSpeaker
    ModalsAdminDeleteStream
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
