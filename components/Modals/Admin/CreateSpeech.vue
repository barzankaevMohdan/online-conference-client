<template lang='pug'>
  UiModal(
    name='create-speech'
  )
    form.auth-form(
      @submit.prevent='submit'
    )
      UiInput.auth-form__field(
        v-model.trim='data.title'
        placeholder="title"
        :error='errors["title"]'
      )
      UiInput.auth-form__field(
        v-model.trim='data.info'
        placeholder="info"
        :error='errors["info"]'
      )
      UiInput.auth-form__field(
        v-model.trim='data.time_begin'
        type="time"
        placeholder="timeBegin"
        :error='errors["time_begin"]'
      )
      UiInput.auth-form__field(
        v-model.trim='data.time_end'
        type="time"
        placeholder="timeEnd"
        :error='errors["time_end"]'
      )
      UiSelect.auth-form__field(
        v-model='data.status'
        placeholder="status"
        :options="statuses"
        :error='errors["status"]'
      )
      UiSelect.auth-form__field.auth-form_select(
        v-model='data.streamId'
        placeholder="streamId"
        :options="streamIds"
        :error='errors["streamId"]'
      )
      .auth-form__footer
        UiButton(
          size='parentWidth'
          :isLoading='isLoading'
        ) Создать
</template>

<script>
import { ACTIONS } from '~/helpers/socketActions'
import socketIO from "~/mixins/socketIO"
import formsFunctions from '~/mixins/formsFunctions'

export default {
  name: 'CreateSpeech',
  mixins: [formsFunctions, socketIO],
  data() {
    return {
      data: {
        streamId: null,
        status: null,
      },
    }
  },
  mounted() {
    this.socket.on(ACTIONS.EDIT_SPEECH, (data) => {
      this.$store.commit('speech/updateSpeech', data)
    })
  },
  methods: {
    async componentHandler() {
      const data = {
        ...this.data,
        streamId: this.data.streamId.value,
        status: this.data.status.value
      }
      await this.$store.dispatch('speech/createSpeech', data).then(data => {
        this.socket.emit(ACTIONS.EDIT_SPEECH, data)
      })
      this.isLoading = false
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
    },
    rules() {
      const baseFieldsRules = {
        title: 'required|min:2',
        info: 'required|min:2',
        time_begin: 'required',
        time_end: 'required',
        status: 'required',
        streamId: 'required',
      }
      return baseFieldsRules
    },
  },
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
