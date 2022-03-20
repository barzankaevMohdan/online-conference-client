<template lang='pug'>
  UiModal(
    name='create-speaker-modal'
  )
    SpeakerCreateForm
</template>

<script>
import SpeakerCreateForm from '../Admin/SpeakerCreateForm.vue'

export default {
  name: 'CreateSpeakerModal',
  components: {SpeakerCreateForm},
}
</script>
