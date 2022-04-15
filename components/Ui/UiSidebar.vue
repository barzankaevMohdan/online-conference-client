<template lang="pug">
  div(v-show="sidebar")
    .sidebar
      .sidebar__content
        slot
      .sidebar__overlay(@click="$emit('sidebar')")
</template>

<script>
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

export default {
  name: 'UiSidebar',
  props: {
    sidebar: {
      type: Boolean,
      default: false,
    },
    lockSidebar: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    lockSidebar(newVal) {
      if (newVal) {
        disablePageScroll()
      } else {
        enablePageScroll()
      }
    },
  },
}
</script>

<style lang='scss'>
@import '~/styles/mixins.scss';
:root {
  /* Размеры */
  --sidebar-width: 80%;
  --sidebar-filter-blur: 5px;

  @include phones() {
    --sidebar-width: 100%;
  }

  /* Цвета */
  --sidebar-background: var(--dark-2);
  --sidebar-overlay-background: var(--main-transparent);
}
</style>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.sidebar {
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  box-sizing: border-box;

  &__content {
    max-width: 100%;
    width: var(--sidebar-width);
    background: var(--sidebar-background);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 2;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: var(--sidebar-overlay-background);
    backdrop-filter: blur(var(--sidebar-filter-blur));
  }
}
</style>
