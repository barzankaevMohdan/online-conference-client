<template lang='pug'>
  LayoutsPageContent
    LayoutsHeader

    .content.content-gap(v-if='gap')
      slot

    .content(v-else)
      slot

</template>

<script>

export default {
  name: 'PageWithHeader',
  props: {
    gap: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
@import '~/styles/mixins.scss';

:root {
  --header-gap: 94px;
  
  @include tablets() {
    --header-gap: 81px;
  }
}
</style>

<style scoped lang="scss">
@import '~/styles/mixins.scss';

.content {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  &-gap {
    padding-top: var(--header-gap);
  }
}
</style>
