<template lang='pug'>
  form.auth-form(
    @submit.prevent='submit'
  )
    UiInput.auth-form__field(
      v-model.trim='data.title'
      placeholder="title"
    )
    UiInput.auth-form__field(
      v-model.trim='data.info'
      placeholder="info"
    )
    UiInput.auth-form__field(
      v-model.trim='data.timeBegin'
      type="time"
      placeholder="timeBegin"
    )
    UiInput.auth-form__field(
      v-model.trim='data.timeEnd'
      type="time"
      placeholder="timeEnd"
    )
    UiSelect.auth-form__field(
      v-model='status'
      :searchable="false"
      :options="statuses"
      placeholder="status"
    )
    UiSelect.auth-form__field.select(
      v-model='streamId'
      :value='streamIds'
      placeholder="streamId"
      :searchable="false"
      :options="streamIds"
    )
    .auth-form__footer
      UiButton(
        size='parentWidth'
        :isLoading='isLoading'
      ) Создать
</template>

<script>
import formsFunctions from '../../mixins/formsFunctions'

export default {
  name: 'SpeechCreateForm',
  mixins: [formsFunctions],
  data() {
    return {
      streamId: null,
      status: null,
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
    statuses() {
      return [
        {
          label: 'online',
          value: 'online'
        },
        {
          label: 'hold',
          value: 'hold'
        },
        {
          label: 'done',
          value: 'done'
        },
      ]
    }
  },
  methods: {
    async componentHandler() {
      const data = {
        ...this.data,
        streamId: this.streamId.value,
        status: this.status.value
      }
      await this.$store.dispatch('speech/createSpeech', data)
      this.isLoading = false
    }
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.auth-form {
  &__field {
    margin-top: 20px;
  }

  .select {
    margin-bottom: 40px;
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

.not-now {
  text-align: center;
}
</style>
