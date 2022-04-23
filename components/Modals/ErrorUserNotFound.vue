<template lang='pug'>
  UiModal(
    name='error-user-not-found'
    @beforeOpen='initData'
  )
    template(v-slot:icon)
      SvgIcon.modal-icon(name='modal-info')
    template(v-slot:title) Пользователь не найден
    | {{`Пользователь с почтой ${info} не найден`}}
    template(v-slot:footer)
      UiButton.modal-login-btn(@click.prevent='login') Войти
      UiButton(@click.prevent='requestPassword') Напомнить пароль
</template>

<script>
export default {
  name: 'ErrorUserNotFound',
  data() {
    return {
      info: {},
    }
  },
  methods: {
    initData(event) {
      this.info = event.ref.params
    },
    close() {
      this.$vfm.hide('error-user-not-found')
    },
    login() {
      this.close()
      this.$vfm.show('authenticate')
    },
    requestPassword() {
      this.close()
      this.$vfm.show('password-forgot', this.info) //to do
    },
  },
}
</script>

<style lang='scss' scoped>
@import "~/styles/mixins.scss";

.modal-icon {
  width: 70px;
  height: 70px;
  fill: var(--main-color);
}

.modal-login-btn {
  margin-right: 10px;
}
</style>
