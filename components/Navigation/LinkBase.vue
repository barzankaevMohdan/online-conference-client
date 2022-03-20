<template lang='pug'>
  a.nav-link(
    @click.prevent='linkTo'
    :class="{[`nav-link_${theme}`]: theme}"
  )
    slot
</template>

<script>

export default {
  name: 'LinkBase',
  props: {
    theme: String,
  },
  methods: {
    linkTo() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.nav-link {
  display: inline-block;
  font-weight: 600;
  font-size: var(--main-small-text);
  line-height: 1.4;
  text-align: center;
  cursor: pointer;
  transition: .2s linear;

  &_sidebar {
    font-size: var(--main-larger-size);
    line-height: 1.3;
    font-weight: 700;
  }

  &,
  &:focus,
  &:visited {
    color: var(--main-light);
    text-decoration: none;
  }

  &:hover,
  &:active {
    color: var(--gray-3);
    text-decoration: none;
  }
}
</style>
