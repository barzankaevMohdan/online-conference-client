<template lang='pug'>
  UiModal(
    name='create-stream-modal'
  )
    StreamCreateForm
</template>

<script>
import StreamCreateForm from '../Admin/StreamCreateForm.vue'

export default {
  name: 'CreateStreamModal',
  components: {StreamCreateForm},
}
</script>
