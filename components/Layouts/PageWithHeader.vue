<template lang='pug'>
  LayoutsPageContent
    LayoutsHeader(
      :absolute='absoluteHeader'
    )
    .content.content-gap(v-if='absoluteHeader && gap')
      slot
    .content(v-else)
      slot
</template>

<script>

export default {
  name: 'PageWithHeader',
  props: {
    absoluteHeader: Boolean,
    gap: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/styles/mixins.scss';

.content {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  &-gap {
    padding-top: 94px;

    @include phones() {
      padding-top: 81px;
    }
  }
}
</style>
