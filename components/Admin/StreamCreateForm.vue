<template lang='pug'>
  form.auth-form(
    @submit.prevent='submit'
  )
    UiInput(
      v-model.trim='data.name'
      placeholder="name"
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
import formsFunctions from '../../mixins/formsFunctions'

export default {
  name: 'StreamCreateForm',
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
