<template lang='pug'>
  .main
    Nuxt
    AllMainModalsHere
</template>

<script>
import AllMainModalsHere from '../components/Modals/AllMainModalsHere.vue'

export default {
  components: {AllMainModalsHere},
  computed: {
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
  },
  beforeCreate() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('user/checkAuth')
    }
  },
  async mounted() {
    if (this.isAuth) {
      await this.$store.dispatch('stream/allStreams')
      await this.$store.dispatch('speech/allSpeeches')
      await this.$store.dispatch('speaker/allSpeakers')
      await this.$store.dispatch('player/getAllRooms')
    }
  },
}
</script>
