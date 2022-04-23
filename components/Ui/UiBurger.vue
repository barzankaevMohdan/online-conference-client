<template lang="pug">
  button.burger(
    @click="$emit('click-menu')"
    :class="{'burger_open': !showMenu, 'burger_close': showMenu}"
    ref="burger"
  )
</template>

<script>
export default {
  name: 'UiBurger',
  props: {
    showMenu: {
      type: Boolean,
      default: false
    },
    openSrc: {
      type: String,
      default: ''
    },
    closeSrc: {
      type: String,
      default: ''
    },
  },
  mounted() {
    if (this.openSrc) {
      this.$refs.burger.style.setProperty('--burger-background-image-open', `url("${this.openSrc}")`)
    }
    if (this.closeSrc) {
      this.$refs.burger.style.setProperty('--burger-background-image-close', `url("${this.closeSrc}")`)
    }
  },
}
</script>

<style lang='scss'>
:root {
  /* Размеры */
  --burger-width: 30px;
  --burger-height: 25px;

  /* Цвета */
  --burger-background: transparent;
  --burger-background-image-open: none;
  --burger-background-image-close: none;
}
</style>

<style scoped lang="scss">
.burger {
  width: var(--burger-width);
  height: var(--burger-height);
  background: var(--burger-background);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  outline: none;
  border: 0;
  cursor: pointer;
  transition: 0.2s;

  &_open {
    background-image: var(--burger-background-image-open);
  }

  &_close {
    background-image: var(--burger-background-image-close);
  }
}
</style>
