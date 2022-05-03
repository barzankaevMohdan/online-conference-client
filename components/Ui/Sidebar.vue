<template lang="pug">
  UiSlideToggle.sidebar(:open="sidebar")
    .sidebar__content
      slot
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
  },
  watch: {
    sidebar(newVal) {
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
  --sidebar-background: var(--dark-2);
}
</style>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.sidebar {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    width: 100%;
    background: var(--sidebar-background);
  }
}
</style>
