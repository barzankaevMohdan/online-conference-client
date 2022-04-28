<template lang="pug">
  div(ref='modalRoot')
    ModalsAuthenticate
    ModalsErrorLoginExist
    ModalsErrorUserNotFound
    ModalsNowOnline
    ModalsSpeech
    ModalsUserBadge
    ModalsSucces
    ModalsForgotPassword
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
  mounted() {
    const event = new Event('modalsReady', {bubbles: true})
    this.$refs.modalRoot.dispatchEvent(event)
  },
}
</script>
