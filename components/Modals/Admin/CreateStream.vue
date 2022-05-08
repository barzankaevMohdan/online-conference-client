<template lang='pug'>
  UiModal(
    name='create-stream'
  )
    form.auth-form(
      @submit.prevent='submit'
    )
      UiInput(
        v-model.trim='data.name'
        placeholder="name"
        :error='errors["name"]'
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
  name: 'CreateStream',
  mixins: [formsFunctions, socketIO],
  mounted() {
    this.socket.on(ACTIONS.EDIT_STREAM, (data) => {
      console.log(ACTIONS.EDIT_STREAM, data);
      this.$store.commit('stream/updateStream', data)
    })
  },
  methods: {
    async componentHandler() {
      const data = {
        ...this.data,
      }
      await this.$store.dispatch('stream/createStream', data).then(data => {
        this.socket.emit(ACTIONS.EDIT_STREAM, data)
      })
      this.isLoading = false
    }
  },
  computed: {
    rules() {
      const baseFieldsRules = {
        name: 'required',
      }
      return baseFieldsRules
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
}
</style>
