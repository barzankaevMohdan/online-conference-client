<template lang="pug">
  UiButton(
    :theme="theme"
    @click.prevent='submit'
  ) {{text}}
</template>

<script>
export default {
  name: 'LoginLogOutBtns',
  props: {
    theme: {
      type: String,
      default: 'fill-main',
    }
  },
  methods: {
    login() {
      this.$vfm.show('authenticate')
    },
    logout() {
      this.$store.dispatch('user/logOut')
      this.$router.push('/')
    },
    submit() {
      this.$emit('click')
      this.isAuth ? this.logout() : this.login()
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
    text() {
      return this.isAuth ? 'Выйти' : 'Войти'
    }
  },
}
</script>
