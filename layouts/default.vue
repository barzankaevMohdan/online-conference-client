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
  watch: {
    isAuth(valuse) {
      if (valuse) {
        this.$store.dispatch('stream/allStreams')
        this.$store.dispatch('speech/allSpeeches')
        this.$store.dispatch('speaker/allSpeakers')
        this.$store.dispatch('player/getAllRooms')
      }
    }
  },
  async beforeCreate() {
    if (localStorage.getItem('token')) {
      await this.$store.dispatch('user/checkAuth')
    }
  },
}
</script>
