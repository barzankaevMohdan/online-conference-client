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
      if (this.isAuth) {
        return 'ConferencePage'
      }
      return 'RegistrationStart'
    },
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
  },
  mounted() {
    this.isMounted = true
  },
}
</script>
