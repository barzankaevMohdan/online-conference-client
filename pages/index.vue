<template lang="pug">
  LayoutsPageContent
    component(:is='siteStatus' :key='isMounted')
</template>

<script>

export default {
  name: 'IndexPage',
  components: {
    RegistrationStart: () => import('./system/-RegistrationStart'),
    ConferencePage: () => import('./system/-ConferencePage'),
  },
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    siteStatus() {
      return this.isAuth ? 'ConferencePage' : 'RegistrationStart'
    },
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
  },
  mounted() {
    this.isMounted = true
  },
  async created() {
    if (this.isAuth) {
      await this.$store.dispatch('stream/allStreams')
      await this.$store.dispatch('speech/allSpeeches')
      await this.$store.dispatch('speaker/allSpeakers')
      await this.$store.dispatch('player/getAllRooms')
    }
  },
}
</script>
