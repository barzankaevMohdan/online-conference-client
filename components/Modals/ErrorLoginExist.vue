<template lang='pug'>
  UiModal(
    name='error-login-exist'
    @beforeOpen='initData'
  )
    template(v-slot:icon)
      SvgIcon.modal-icon(name='modal-info')
    template(v-slot:title) Пользователь уже существует
    | {{`Пользователь с почтой ${info} уже сущетвует`}}
    template(v-slot:footer)
      UiButton.modal-login-btn(@click.prevent='login') Войти
      UiButton(@click.prevent='requestPassword') Напомнить пароль

</template>

<script>
export default {
  name: 'ErrorLoginExistModal',
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
      this.$vfm.hide('error-login-exist')
    },
    login() {
      this.close()
      this.$vfm.show('authenticate')
    },
    requestPassword() {
      this.close()
      this.$vfm.show('password-forgot', this.info)
    },
  },
}
</script>

<style lang='scss' scoped>
.modal-icon {
  width: 70px;
  height: 70px;
  fill: var(--main-color)
}

.modal-login-btn {
  margin-right: 10px;
}
</style>
