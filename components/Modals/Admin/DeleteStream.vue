<template lang='pug'>
  UiModal(
    name='delete-stream'
  )
    form.auth-form(
      @submit.prevent='submit'
    )
      UiSelect.auth-form__field.select(
        v-model='streamId'
        :value='streamIds'
        placeholder="stream"
        :searchable="false"
        :options="streamIds"
      )
      .auth-form__footer
        UiButton(
          size='parentWidth'
          :isLoading='isLoading'
        ) Удалить
</template>

<script>
import formsFunctions from '~/mixins/formsFunctions'

export default {
  name: 'DeleteStream',
  mixins: [formsFunctions],
  data() {
    return {
      streamId: null,
    }
  },
  methods: {
    async componentHandler() {
      await this.$store.dispatch('stream/deleteStream', this.streamId.value)
      this.isLoading = false
      this.$vfm.hide('delete-stream-modal')
    }
  },
  computed: {
    streamIds() {
      const streams = this.$store.getters['stream/allStreams'].map((stream) => {
      return {
          label: stream.name,
          value: stream.id
      }
      })
      return streams
    },
  }
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.auth-form {
  &__field {
    margin-top: 20px;
  }

  .select {
    margin-bottom: 50px;
  }

  &__footer {
    margin-top: 30px;
  }

  &__error {
    display: block;
    font-size: 10px;
    line-height: 14px;
    color: var(--main-danger-color);
    margin: 0 0 25px 25px;
  }
}
</style>
