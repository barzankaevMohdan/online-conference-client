<template lang='pug'>
  nuxt-link(:to='to')
    picture.app-logo
      img.app-logo__image(
        :src='src'
        alt=''
      )
</template>

<script>
export default {
  name: 'LogoWithLink',
  props: {
    to: {
      type: [String, Object],
      default: '/',
    },
    src: {
      type: String,
      default: require("~/assets/img/logo/logo-night.png"),
    },
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.app-logo {
  width: 120px;
  height: 41px;
  display: flex;

  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>
