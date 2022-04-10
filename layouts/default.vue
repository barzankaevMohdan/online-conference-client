<template lang='pug'>
  .main
    Nuxt
    AllMainModalsHere
</template>

<script>
import AllMainModalsHere from '../components/Modals/AllMainModalsHere.vue'

export default {
  components: {AllMainModalsHere},
  async beforeCreate() {
    if (localStorage.getItem('refreshToken')) {
      await this.$store.dispatch('user/checkAuth')
    }
  },
  async created() {
    if (localStorage.getItem('refreshToken')) {
      await this.$store.dispatch('stream/allStreams')
      await this.$store.dispatch('speech/allSpeeches')
      await this.$store.dispatch('speaker/allSpeakers')
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
  },
  watch: {
    isAuth(value) {
      if (value) {
        this.$store.dispatch('stream/allStreams')
        this.$store.dispatch('speech/allSpeeches')
        this.$store.dispatch('speaker/allSpeakers')
      }
    }
  }
}
</script>
