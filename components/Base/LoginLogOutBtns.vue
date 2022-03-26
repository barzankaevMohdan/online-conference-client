<template lang="pug">
  UiButton(
    :theme="theme"
    v-if='isAuth'
    @click.prevent='logout'
  ) Выйти
  UiButton(
    :theme="theme"
    @click.prevent='login'
    v-else
  ) Войти

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
  },
  computed: {
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
  },
}
</script>
