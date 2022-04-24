<template lang='pug'>
  UiModal(
    name='delete-stream'
  )
    form.auth-form(
      @submit.prevent='submit'
    )
      UiSelect.auth-form__field.auth-form__select(
        v-model='streamId'
        placeholder="stream"
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

  &__footer {
    margin-top: 30px;
  }

  &__error {
    display: block;
    font-size: var(--main-input-label-size);
    line-height: 1.4;
    color: var(--main-danger-color);
    margin: var(--main-input-label-offset-top) 0 0 var(--main-input-label-offset-left);
  }

  &_select {
    margin-bottom: 50px;
  }
}
</style>
