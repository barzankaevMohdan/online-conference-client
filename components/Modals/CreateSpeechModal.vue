<template lang='pug'>
  UiModal(
    name='create-speech-modal'
  )
    SpeechCreateForm
</template>

<script>
import SpeechCreateForm from '../Admin/SpeechCreateForm.vue'

export default {
  name: 'CreateSpeechModal',
  components: {SpeechCreateForm},
}
</script>
